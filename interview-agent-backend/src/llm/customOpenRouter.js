import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AIMessage } from "@langchain/core/messages";

export class OpenRouterChat extends BaseChatModel {
  constructor(fields = {}) {
    super(fields);
    this.model = fields.model;
    this.apiKey = fields.apiKey;
    this.temperature = fields.temperature ?? 0.2;
  }

  _llmType() {
    return "openrouter-chat";
  }

  async _generate(messages, options, runManager) {
    const formatted = messages.map((m) => ({
      role: m._getType(),
      content: m.content,
    }));

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "Interview Agent",
        },
        body: JSON.stringify({
          model: this.model,
          messages: formatted,
          temperature: this.temperature,
        }),
      }
    );

    const data = await response.json();

    const text = data.choices[0].message.content;

    return {
      generations: [
        {
          text,
          message: new AIMessage(text),
        },
      ],
    };
  }
}
