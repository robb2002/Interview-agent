import { PromptTemplate } from "@langchain/core/prompts";

export const questionPrompt = PromptTemplate.fromTemplate(`
You are an interview question generator. 
Use ONLY the resume text below to generate **3 accurate, personalized interview questions**.

Resume:
{resume}

Generated Questions:
`);
