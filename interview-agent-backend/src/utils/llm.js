import axios from "axios";

export const askLLM = async (prompt) => {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const response = await axios({
      method: "POST",
      url: "https://openrouter.ai/api/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Interview Agent",
      },
      data: {
        model: "meta-llama/llama-3.3-70b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
      },
      timeout: 20000,
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("LLM ERROR:", err.response?.data || err.message);
    return "LLM generation failed.";
  }
};
