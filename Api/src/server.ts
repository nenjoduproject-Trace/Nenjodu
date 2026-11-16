import app from "./app";
import pool from "./config/database";
import questionRoutes from "./routes/question.routes";

const PORT = Number(process.env.PORT || 5000);

async function startServer() {

  try {

    await pool.query("SELECT NOW()");

    console.log("serviceTS::::::::");
    console.log("Database connection successful");

    app.listen(PORT, () => {

      console.log(
        `Server running at http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Unable to connect to PostgreSQL:",
      error
    );

    process.exit(1);
  }
}

startServer();