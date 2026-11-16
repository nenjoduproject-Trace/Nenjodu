import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoryRoutes from "./routes/category.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import questionRoutes from "./routes/question.routes";

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

app.use(
  "/api/categories",
  categoryRoutes
);
app.use("/api/dashboard", dashboardRoutes);
console.log("appTs::::::::");
app.use("/api/question", questionRoutes);

export default app;