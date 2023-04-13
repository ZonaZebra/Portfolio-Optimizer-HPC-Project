import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
});

export async function getCachedData(symbol: string): Promise<string | null> {
  try {
    const data = await redisClient.get(symbol);
    return data;
  } catch (error) {
    console.error(`Error fetching data from Redis for symbol: ${symbol}`);
    throw error;
  }
}

export async function setCachedData(symbol: string, data: string): Promise<void> {
  try {
    // Set an expiration time (in seconds) if needed, e.g., 24 hours (60 * 60 * 24)
    await redisClient.set(symbol, data, "EX", 60 * 60 * 24);
  } catch (error) {
    console.error(`Error setting data in Redis for symbol: ${symbol}`);
    throw error;
  }
}
