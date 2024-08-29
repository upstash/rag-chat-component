import { openai, RAGChat } from "@upstash/rag-chat";

export const ragChat = new RAGChat({
  model: openai("gpt-4"),
});
