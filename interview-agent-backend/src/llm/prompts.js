import { PromptTemplate } from "@langchain/core/prompts";

export const intentPrompt = PromptTemplate.fromTemplate(`
You are a classifier that decides what the user wants.

Possible intents:
- "resume_qa" → The user is asking about details in their resume (name, skills, experience, projects, education, etc.)
- "interview_questions" → The user is asking you to generate interview questions or start an interview.
- "other" → Anything else.

User message:
{query}

Output only one word:
resume_qa
or
interview_questions
or
other
`);
