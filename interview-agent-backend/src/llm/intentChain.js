import { llm } from "./client.js";
import { intentPrompt } from "./prompts.js";

export const intentChain = intentPrompt.pipe(llm);
