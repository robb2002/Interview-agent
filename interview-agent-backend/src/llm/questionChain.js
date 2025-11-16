import { llm } from "./client.js";
import { RunnableSequence } from "@langchain/core/runnables";
import { questionPrompt } from "./questionPrompt.js";

export const questionChain = RunnableSequence.from([questionPrompt, llm]);
