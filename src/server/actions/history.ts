'use server'

import { getHistoryClient } from "../lib/history/get-client";
import type { Message } from "../lib/types";

const history = getHistoryClient();

export async function getHistory(sessionId: string): Promise<{ messages: Message[] }> {
	try {
		const messages = await history.getMessages({ sessionId });
		return { messages };
	} catch (error) {
		console.error("Failed to fetch chat history:", error);
		return { messages: [] };
	}
}

export async function deleteHistory(sessionId: string): Promise<{ success: boolean }> {
	try {
		await history.deleteMessages({ sessionId });
		return { success: true };
	} catch (error) {
		console.error("Failed to delete chat history:", error);
		return { success: false };
	}
}