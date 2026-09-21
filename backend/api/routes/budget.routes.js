import express from "express";
import { createBudget, getBudget, getBudgetById } from "../controller/budget.controller.js";
import { protect } from "../../utils/protect.js";

const router = express.Router();

router.post("/create", protect, createBudget);
router.get("/get", protect, getBudget);
router.get("/get/:id", protect, getBudgetById);

export default router;
