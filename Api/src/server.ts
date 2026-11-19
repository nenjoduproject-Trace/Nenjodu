import app from "./app";
import pool from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});

server.on("error", (error) => {
  console.error("Unable to start HTTP server:", error);
  process.exit(1);
});

async function checkDatabaseWithRetry(): Promise<void> {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await pool.query("SELECT NOW()");
      console.log("Database connection successful");
      return;
    } catch (error) {
      if (attempt === maxAttempts) {
        console.error(
          `Unable to connect to PostgreSQL after ${maxAttempts} attempts. The HTTP server remains available; database-backed requests may fail.`,
          error,
        );
        return;
      }

      const delay = Math.min(1000 * 2 ** (attempt - 1), 8000);
      console.error(
        `PostgreSQL connection attempt ${attempt} failed; retrying in ${delay}ms.`,
        error,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

void checkDatabaseWithRetry();