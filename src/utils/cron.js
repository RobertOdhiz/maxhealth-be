import cron from "node-cron";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Scheduled Job: Delete "info" logs every 24 hours
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running log cleanup job...");
    await pool.query("DELETE FROM logs WHERE level = 'info'");
    console.log("Old logs deleted successfully.");
  } catch (error) {
    console.error("Error deleting logs:", error);
  }
});

export default cron;
