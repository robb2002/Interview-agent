import express from "express";
import { ragQuery } from "../controllers/ragController.js";

const router = express.Router();

router.post("/query", ragQuery);

export default router;
