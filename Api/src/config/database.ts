import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const databaseSsl = process.env.DATABASE_SSL?.trim().toLowerCase();
const useSsl = databaseSsl === undefined || databaseSsl === ""
  ? process.env.NODE_ENV === "production"
  : databaseSsl === "true";
const ssl = useSsl ? { rejectUnauthorized: false } : false;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl,
      connectionTimeoutMillis: 5000,
    })
  : new Pool({
      host: process.env.DB_HOST || "database-url-not-configured.invalid",
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl,
      connectionTimeoutMillis: 5000,
    });

if (!databaseUrl && !process.env.DB_HOST) {
  console.error(
    "Database configuration is missing: set DATABASE_URL or DB_HOST.",
  );
}

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (error) => {
  console.error("PostgreSQL connection error:", error);
});

export function isDatabaseUnavailable(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  const code = error.code;
  if (typeof code !== "string") {
    return false;
  }

  return (
    code.startsWith("08")
    || ["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "ENOTFOUND", "EAI_AGAIN", "28P01", "3D000"]
      .includes(code)
  );
}

export default pool;