import type { BaseMessageHistory } from "../types";
import { RedisHistory } from "./redis";
import { InMemoryHistory } from "./in-memory";

export const getHistoryClient = (): BaseMessageHistory => {
	const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
	const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

	if (redisUrl && redisToken) {
		return new RedisHistory({
			config: {
				url: redisUrl,
				token: redisToken,
			}
		});
	}

	return new InMemoryHistory();
}