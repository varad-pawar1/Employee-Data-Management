import express from "express";
import type { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { employeesRoutes } from "./routes/employeesRoutes.js";

dotenv.config();
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

// Start Server after DB connection
const PORT = Number(process.env.PORT) || 5000;

connectDB()
  .then((db) => {
    app.use("/api/employees", employeesRoutes(db));

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to connect database:", err.message);
    process.exit(1);
  });


