"use server";

import { Index } from "@upstash/vector"
import { Redis } from "@upstash/redis"

import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { createStreamableValue, type StreamableValue } from "ai/rsc";
import { DEFAULT_PROMPT } from "../constants";
import type { Message } from "../lib/types";
import { getHistoryClient } from "../lib/history";

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

const history = getHistoryClient()

export const serverChat = async ({
  messages,
  sessionId,
}: {
  messages: Message[];
  sessionId: string;
}): Promise<{ output: StreamableValue<string> }> => {
  const userMessage = messages[messages.length - 1]

  await history.addMessage({
    message: userMessage,
    sessionId
  })

  const similarDocs = await searchSimilarDocs(userMessage.content, 5)

  const context = similarDocs.map(doc => doc.data).join("\n")

  const chatMessages = messages.map(message => message.content).join("\n")

  const system = DEFAULT_PROMPT({ context, question: userMessage.content, chatMessages })

  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: together(process.env.TOGETHER_MODEL ?? "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
      system,
      messages: messages,
      async onFinish({ text }) {
        await history.addMessage({
          message: {
            role: "assistant",
            content: text,
            id: Date.now().toString(),
          },
          sessionId
        })
      }
    })

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value }
};
