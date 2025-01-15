import type { Message, BaseMessageHistory } from "../types";
import { DEFAULT_CHAT_SESSION_ID, DEFAULT_HISTORY_LENGTH } from "../../constants";

declare global {
	var store: Record<string, { messages: Message[] }>;
}
export class InMemoryHistory implements BaseMessageHistory {
	constructor() {
		if (!global.store) global.store = {};
	}

	async addMessage(params: {
		message: Message;
		sessionId: string;
		sessionTTL?: number;
	}): Promise<void> {
		const { message, sessionId = DEFAULT_CHAT_SESSION_ID } = params;
		if (!global.store[sessionId]) {
			global.store[sessionId] = { messages: [] };
		}

		const oldMessages = global.store[sessionId].messages || [];
		const newMessages = [message, ...oldMessages];
		global.store[sessionId].messages = newMessages;
	}

	async deleteMessages({ sessionId }: { sessionId: string }): Promise<void> {
		if (!global.store[sessionId]) {
			return;
		}
		global.store[sessionId].messages = [];
	}

	async getMessages({
		sessionId = DEFAULT_CHAT_SESSION_ID,
		amount = DEFAULT_HISTORY_LENGTH,
		startIndex = 0,
	}): Promise<Message[]> {
		if (!global.store[sessionId]) {
			global.store[sessionId] = { messages: [] };
		}

		const messages = global.store[sessionId]?.messages ?? [];
		const slicedMessages = messages.slice(startIndex, startIndex + amount);
		return slicedMessages.reverse();
	}
}
