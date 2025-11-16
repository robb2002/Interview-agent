import { parsePDF } from "../utils/pdfParser.js";
import { parseDOCX } from "../utils/docxParser.js";
import { parseImage } from "../utils/imageParser.js";

import path from "path";
import { storeResumeInFaiss } from "../rag/ingestResumeFaiss.js";
import { sanitizeText } from "../utils/sanitize.js";
import { resetFaissIndex } from "../rag/faissIndex.js";

export const handleResumeUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    if (ext === ".pdf") {
      extractedText = await parsePDF(filePath);
    } else if (ext === ".docx") {
      extractedText = await parseDOCX(filePath);
    } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      extractedText = await parseImage(filePath);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const sanitizedText = sanitizeText(extractedText);

    resetFaissIndex();

    // 4️⃣ Ingest into vector DB
    const result = await storeResumeInFaiss(
      sanitizedText,
      req.body.userId || "user1"
    );

    // 5️⃣ Respond immediately
    res.json({
      message: "Resume uploaded, extracted and stored successfully",
      extractedText, // send back for UI display if needed
      sanitizedText, // optional
      chunksStored: result.totalChunks,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to parse resume" });
  }
};

export const processResume = async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No resume text provided" });
    }

    const sanitizedText = sanitizeText(text);
    resetFaissIndex();

    const result = await storeResumeInFaiss(sanitizedText, userId || "user1");

    res.json({
      message: "Resume stored in FAISS",
      chunks: result.totalChunks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to store resume in FAISS" });
  }
};
