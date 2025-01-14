"use server";

export type Message = {
  role: "user" | "assistant";
  content: string;
  id: string
}

import { Index } from "@upstash/vector"

import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { createStreamableValue, type StreamableValue } from "ai/rsc";
import { DEFAULT_PROMPT } from "./constants";

const vectorIndex = new Index()

const together = createOpenAI({
  apiKey: process.env.TOGETHER_API_KEY ?? "",
  baseURL: "https://api.together.xyz/v1"
})

const searchSimilarDocs = async (data: string, topK: number) => {
  const results = await vectorIndex.query({
    data,
    topK: topK ? topK : 5,
    includeMetadata: true,
    includeData: true,
  });

  return results
}

export const serverChat: (args: {
  history: Message[];
}) => Promise<{ output: StreamableValue<string, any> }> = async ({
  history,
}: {
  history: Message[];
}) => {
    const userMessage = history[history.length - 1]

    const similarDocs = await searchSimilarDocs(userMessage.content, 5)

    const context = similarDocs.map(doc => doc.data).join("\n")

    const chatHistory = history.map(message => message.content).join("\n")

    const system = DEFAULT_PROMPT({ context, question: userMessage.content, chatHistory })

    const stream = createStreamableValue("");

    (async () => {
      const { textStream } = streamText({
        model: together(process.env.TOGETHER_MODEL ?? "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
        system,
        messages: history,
      })

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
    })();

    return { output: stream.value }
  };
