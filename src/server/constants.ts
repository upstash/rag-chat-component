type PromptParameters = {
	chatMessages?: string;
	question: string;
	context: string;
};

type Prompt = ({ question, chatMessages, context }: PromptParameters) => string;

export const DEFAULT_PROMPT: Prompt = ({ context, question, chatMessages }) =>
	`You are a concise AI assistant helping users on a website. Provide brief, clear answers in 1-2 sentences when possible.
  
  Context and chat history are provided to help you answer questions accurately. Only use information from these sources.
  
  ${context ? `Context: ${context}\n` : ''}${chatMessages ? `Previous messages: ${chatMessages}\n` : ''}
  Q: ${question}
  A:`;

export const DEFAULT_CHAT_SESSION_ID = "upstash-rag-chat-session";

export const DEFAULT_HISTORY_LENGTH = 5;