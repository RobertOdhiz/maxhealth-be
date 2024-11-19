import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

if (!process.env.REDIS_URL) {
  console.error("REDIS_URL not set");
}

const redisConfig = {
  url: process.env.REDIS_URL,
};

let client = null;

/**
 * Get or create a Redis client instance.
 * @param {object} options - Redis client options.
 * @returns {Promise<object>} - The Redis client instance.
 */
export default async function getClient(options = {}) {
  options = {
    ...redisConfig,
    ...options,
  };

  if (client && client.options?.url === options.url) {
    return client;
  }

  if (client) {
    await refreshClient();
  }

  client = createClient(options);

  client
    .on("error", (err) => {
      console.error("Redis Client Error", err);
      void refreshClient();
    })
    .connect();

  return client;
}

/**
 * Disconnect and reset the Redis client.
 * @returns {Promise<void>}
 */
async function refreshClient() {
  if (client) {
    await client.disconnect();
    client = null;
  }
}
