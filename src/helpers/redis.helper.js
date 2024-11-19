import getClient from "../utils/redis";

// Redis helper functions
const RedisHelper = {

    /**
     * Set a value in Redis
     * @param {string} key - The key for the Redis entry.
     * @param {any} value - The value to store.
     * @param {number} [expiry] - Optional expiry time in seconds.
     */
    async set(key, value, expiry = null) {
        try {
            const client = await getClient();
            const stringValue = JSON.stringify(value);
            if (expiry) {
                await client.setEx(key, expiry, stringValue);
            } else {
                await client.set(key, stringValue);
            }
            console.log(`Key "${key}" set successfully.`);
        } catch (error) {
            console.error(`Error setting key "${key}":`, error);
        }
    },

    /**
     * Get a value from Redis
     * @param {string} key - The key for the Redis entry.
     * @returns {Promise<any>} - The value associated with the key, or null if not found.
     */
    async get(key) {
        try {
            const client = await getClient();
            const data = await client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error retrieving key "${key}":`, error);
            return null;
        }
    },

    /**
     * Update a value in Redis
     * @param {string} key - The key for the Redis entry.
     * @param {any} newValue - The new value to store.
     * @param {number} [expiry] - Optional expiry time in seconds.
     */
    async update(key, newValue, expiry = null) {
        try {
            const client = await getClient();
            const exists = await client.exists(key);
            if (exists) {
                await this.set(key, newValue, expiry);
                console.log(`Key "${key}" updated successfully.`);
            } else {
                console.warn(`Key "${key}" does not exist.`);
            }
        } catch (error) {
            console.error(`Error updating key "${key}":`, error);
        }
    },

    /**
     * Delete a key from Redis
     * @param {string} key - The key to delete.
     */
    async del(key) {
        try {
            const client = await getClient();
            await client.del(key);
            console.log(`Key "${key}" deleted successfully.`);
        } catch (error) {
            console.error(`Error deleting key "${key}":`, error);
        }
    }
};

export default RedisHelper;
