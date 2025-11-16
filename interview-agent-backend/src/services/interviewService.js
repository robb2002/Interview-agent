import { searchFaiss } from "../rag/retrieveFaiss.js";
import { askLLM } from "../utils/llm.js";

export const generateInterviewQuestion = async (userQuery) => {
  // Step 1: Retrieve relevant resume chunks
  const ragResults = await searchFaiss(userQuery, 5);

  const context = ragResults.map((r) => `• ${r.text}`).join("\n");

  // Step 2: Build LLM Prompt
  const prompt = `
You are an expert technical interviewer.
Use ONLY the following resume context to ask relevant interview questions.

Resume Context:
${context}

User Query:
${userQuery}

Now generate 3 professional interview questions directly based on the resume information above.
  `;

  // Step 3: Ask LLM
  const llmResponse = await askLLM(prompt);

  return {
    ragResults,
    llmResponse,
  };
};
