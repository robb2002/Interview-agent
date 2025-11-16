import { ragChain } from "../rag/ragChain.js";
import { questionChain } from "../llm/questionChain.js";

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { query, userId } = req.body;

    // 1. RAG Retrieval
    const { answer: resumeInfo, results } = await ragChain(query);

    // 2. LLM Question Generation
    const finalQs = await questionChain.invoke({
      resume: resumeInfo,
    });

    res.json({
      message: "Interview question generated",
      rag: results,
      questions: finalQs.content,
    });
  } catch (err) {
    console.log("API ERROR:", err);
    res.status(500).json({ error: "Failed to generate" });
  }
};
