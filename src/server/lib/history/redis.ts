import { Redis, type RedisConfigNodejs } from "@upstash/redis";
import { DEFAULT_CHAT_SESSION_ID, DEFAULT_HISTORY_LENGTH } from "../../constants";
import type { Message, BaseMessageHistory } from "../types";

export type RedisHistoryConfig = {
	config?: RedisConfigNodejs;
	client?: Redis;
};

export class RedisHistory implements BaseMessageHistory {
	public client: Redis;

	constructor(config: RedisHistoryConfig) {
		const { config: redisConfig, client } = config;

		if (client) {
			this.client = client;
		} else if (redisConfig) {
			this.client = new Redis(redisConfig);
		} else {
			throw new Error(
				"Redis message stores require either a config object or a pre-configured client."
			);
		}
	}

	async addMessage(params: {
		message: Message;
		sessionId: string;
		sessionTTL?: number;
	}): Promise<void> {
		const { message, sessionId = DEFAULT_CHAT_SESSION_ID, sessionTTL } = params;
		await this.client.lpush(sessionId, JSON.stringify(message));
		if (sessionTTL) {
			await this.client.expire(sessionId, sessionTTL);
		}
	}

	async deleteMessages({ sessionId }: { sessionId: string }): Promise<void> {
		await this.client.del(sessionId);
	}

	async getMessages({
		sessionId = DEFAULT_CHAT_SESSION_ID,
		amount = DEFAULT_HISTORY_LENGTH,
		startIndex = 0,
	}): Promise<Message[]> {
		const endIndex = startIndex + amount - 1;
		const messages = await this.client.lrange<Message>(
			sessionId,
			startIndex,
			endIndex
		);

		return messages.reverse();
	}
}