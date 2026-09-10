import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// 開発環境や環境変数未設定時のインメモリフォールバック
const memoryStore: Record<string, number> = {};

export async function getViews(id: string): Promise<number> {
  if (redis) {
    try {
      const count = await redis.get<number>(`views:${id}`);
      return count ?? 0;
    } catch (e) {
      console.error("Redis getViews error:", e);
    }
  }
  return memoryStore[id] ?? 0;
}

export async function incrementViews(id: string): Promise<number> {
  if (redis) {
    try {
      const count = await redis.incr(`views:${id}`);
      return count;
    } catch (e) {
      console.error("Redis incrementViews error:", e);
    }
  }
  memoryStore[id] = (memoryStore[id] ?? 0) + 1;
  return memoryStore[id];
}
