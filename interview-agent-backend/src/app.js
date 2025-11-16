import express from "express";
import cors from "cors";

const app = express();
import resumeRoutes from "./routes/resumeRoutes.js";
import ragRoutes from "./routes/ragRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resume", resumeRoutes);
app.use("/api/rag", ragRoutes);

app.use("/api/interview", interviewRoutes);
// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Interview Agent Backend Running" });
});

export default app;
