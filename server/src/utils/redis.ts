import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let client: any;

async function getClient() {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
    });

    client.on("error", (err: any) => {
      console.error("Redis Client Error", err);
    });

    await client.connect();
  }
  return client;
}

// Set key and value in Redis DB
export async function setValueInRedis(
  key: string, 
  value: string, 
  expiry?: number
) {
  try {
    const client = await getClient();
    if (expiry) {
      await client.set(key, value, {
        EX: expiry,
      });
    } else {
      await client.set(key, value);
    }
  } catch (error) {
    console.error("Error setting value in Redis:", error);
  }
}

// Get value from key from Redis DB
export async function getValueFromRedis(key: string) {
  try {
    const client = await getClient();
    if (key) {
      const value = await client.get(key);
      return value;
    }
  } catch (error) {
    console.error("Error getting value from Redis:", error);
  }
}
