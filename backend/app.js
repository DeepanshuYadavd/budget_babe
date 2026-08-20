import express from "express";
import dotenv from "dotenv";
import authRouter from "./api/routes/auth.routes.js";
import categoryRouter from "./api/routes/category.routes.js";
import budgetRouter from "./api/routes/budget.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//  config:
dotenv.config();

//  middlewares:
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

//  routes:
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/budget", budgetRouter);

export default app;
