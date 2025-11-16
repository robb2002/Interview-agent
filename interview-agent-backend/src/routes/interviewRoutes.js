import express from "express";
import { generateInterviewQuestions } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/ask", generateInterviewQuestions);

export default router;
