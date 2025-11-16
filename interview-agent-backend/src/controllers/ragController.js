import { searchFaiss } from "../rag/retrieveFaiss.js";

export const ragQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const results = await searchFaiss(query, 5);

    res.json({
      message: "RAG search success",
      results,
    });
  } catch (err) {
    console.error("RAG retrieval error:", err.message);
    const statusCode = err.message.includes("empty") ? 404 : 500;
    res.status(statusCode).json({
      error: "RAG retrieval failed",
      message: err.message,
    });
  }
};
