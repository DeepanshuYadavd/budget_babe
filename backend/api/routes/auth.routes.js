import express from "express";
import { getUser, signin, signup } from "../controller/auth.controller.js";
import { protect } from "../../utils/protect.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/get-user", protect, getUser);

export default router;
