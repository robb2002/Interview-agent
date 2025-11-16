import { questionPrompt } from "./prompts.js";
import { llm } from "./client.js";
import { RunnableSequence } from "@langchain/core/runnables";

export const questionChain = RunnableSequence.from([questionPrompt, llm]);
