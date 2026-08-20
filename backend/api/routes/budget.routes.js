import express from "express";
import { createBudget, getBudget } from "../controller/budget.controller.js";
import { protect } from "../../utils/protect.js";

const router = express.Router();

router.post("/create", protect, createBudget);
router.get("/get", protect, getBudget);

export default router;
