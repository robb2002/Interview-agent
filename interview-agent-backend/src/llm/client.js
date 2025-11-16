import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant", // best free + fast
  temperature: 0.3, // good for interview Q&A
});
export { llm };
