import express from "express";
import multer from "multer";
import {
  handleResumeUpload,
  processResume,
} from "../controllers/resumeController.js";

const router = express.Router();

// Setup file upload
const storage = multer.diskStorage({
  destination: "uploads/resumes/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route: POST /api/resume/upload
router.post("/upload", upload.single("resume"), handleResumeUpload);
router.post("/process", processResume);
export default router;
