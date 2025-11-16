import { intentChain } from "../llm/intentChain.js";
import { resumeQAChain } from "../llm/resumeQAChain.js";
import { questionChain } from "../llm/questionChain.js";
import { ragChain } from "../rag/ragChain.js";

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { query, userId } = req.body;

    // STEP 1: Classify user intent
    const intentResult = await intentChain.invoke({ query });
    const intent = intentResult.content.trim().toLowerCase();

    // STEP 2: RAG retrieval for resume matching
    const { answer: resumeInfo, results } = await ragChain(query);

    // STEP 3: Route based on intent
    if (intent === "resume_qa") {
      const answer = await resumeQAChain.invoke({
        resume: resumeInfo,
        question: query,
      });

      return res.json({
        type: "resume_answer",
        answer: answer.content,
      });
    }

    if (intent === "interview_questions") {
      const questions = await questionChain.invoke({
        resume: resumeInfo,
      });

      let parsedQuestions;

      try {
        parsedQuestions = JSON.parse(questions.content);
      } catch (err) {
        // fallback if JSON parsing fails
        parsedQuestions = [{ question: questions.content }];
      }

      return res.json({
        type: "interview_questions",
        questions: parsedQuestions,
        rag: results,
      });
    }

    return res.json({
      type: "other",
      message: "I can answer resume questions or generate interview questions.",
    });
  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
