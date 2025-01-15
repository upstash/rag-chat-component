import type { BaseMessageHistory } from "../types";
import { RedisHistory } from "./redis";
import { InMemoryHistory } from "./in-memory";

export const getHistoryClient = (): BaseMessageHistory => {
	const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
	const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

	if (redisUrl && redisToken) {
		console.log('Using Redis history implementation');
		return new RedisHistory({
			config: {
				url: redisUrl,
				token: redisToken,
			}
		});
	}

	console.log('Using in-memory history implementation');
	return new InMemoryHistory();
}