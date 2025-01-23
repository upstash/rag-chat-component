export type Message = {
	role: "user" | "assistant" | "error"
	content: string;
	id: string
}

export interface BaseMessageHistory {
	addMessage(params: {
		message: Message;
		sessionId: string;
		sessionTTL?: number;
	}): Promise<void>;

	deleteMessages(params: {
		sessionId: string
	}): Promise<void>;

	getMessages(params: {
		sessionId: string;
		amount?: number;
		startIndex?: number;
	}): Promise<Message[]>;
}