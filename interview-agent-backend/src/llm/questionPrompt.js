import { PromptTemplate } from "@langchain/core/prompts";

export const questionPrompt = PromptTemplate.fromTemplate(`
You are an interview question generator.

Your task:
- Read the resume below.
- Generate EXACTLY 3 beginner-level, easy interview questions.
- Each question must focus on a specific skill, project, or experience mentioned in the resume.
- All questions MUST be basic and suitable for a beginner.
- Difficulty must always be "easy".

Important rules:
- Output ONLY valid JSON.
- NO explanations.
- NO additional text.
- DO NOT add comments or formatting outside JSON.

Resume:
{resume}

Output format (strict JSON):
[
  {{
    "question": "string",
    "topic": "string",
    "difficulty": "easy"
  }},
  {{
    "question": "string",
    "topic": "string",
    "difficulty": "easy"
  }},
  {{
    "question": "string",
    "topic": "string",
    "difficulty": "easy"
  }}
]
`);
