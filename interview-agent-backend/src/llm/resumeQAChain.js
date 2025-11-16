import { resumeQAPrompt } from "./resumeQAPrompt.js"; // correct import
import { llm } from "./client.js"; // shared LLM instance

// Build chain: Prompt → LLM
export const resumeQAChain = resumeQAPrompt.pipe(llm);
