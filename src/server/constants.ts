type PromptParameters = {
	chatHistory?: string;
	question: string;
	context: string;
};

type Prompt = ({ question, chatHistory, context }: PromptParameters) => string;

export const DEFAULT_PROMPT: Prompt = ({ context, question, chatHistory }) =>
	`You are a concise AI assistant helping users on a website. Provide brief, clear answers in 1-2 sentences when possible.
  
  Context and chat history are provided to help you answer questions accurately. Only use information from these sources.
  
  ${context ? `Context: ${context}\n` : ''}${chatHistory ? `Previous messages: ${chatHistory}\n` : ''}
  Q: ${question}
  A:`;