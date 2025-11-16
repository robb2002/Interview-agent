import { llm } from "../llm/client.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { searchFaiss } from "./retrieveFaiss.js";

const ragPrompt = PromptTemplate.fromTemplate(`
Use the below retrieved resume chunks to answer the user's question.

Retrieved Chunks:
{context}

User Question:
{query}

Answer:
`);

export const ragChain = async (query) => {
  const results = await searchFaiss(query);

  const chunks = results.map((r) => r.text).join("\n\n");

  const chain = RunnableSequence.from([ragPrompt, llm]);

  const answer = await chain.invoke({
    query,
    context: chunks,
  });

  return { answer, results };
};
