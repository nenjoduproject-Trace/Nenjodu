import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoryRoutes from "./routes/category.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import questionRoutes from "./routes/question.routes";
import pool from "./config/database";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.79:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Islam Platform API is running",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.status(200).json({
      success: true,
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    return res.status(503).json({
      success: false,
      status: "error",
      database: "unavailable",
      message: "Database is currently unavailable.",
    });
  }
});

app.use(
  "/api/categories",
  categoryRoutes
);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/question", questionRoutes);

export default app;