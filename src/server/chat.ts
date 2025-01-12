"use server";

import type { UpstashMessage } from "@upstash/rag-chat";
import { createServerActionStream } from "@upstash/rag-chat/nextjs";
import { ragChat } from "./rag-chat";

export const serverChat: (args: {
  userMessage: UpstashMessage;
}) => Promise<ReturnType<typeof createServerActionStream>> = async ({
  userMessage,
}: {
  userMessage: UpstashMessage;
}) => {
  const { output } = await ragChat.chat(userMessage.content, {
    streaming: true,
  });

  const stream = createServerActionStream(output);

  return stream;
};
