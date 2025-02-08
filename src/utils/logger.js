import winston from "winston";
import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Ensure logs directory exists
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true }); // Creates the logs directory if it doesn't exist
}

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Custom Winston Transport for PostgreSQL
class PostgresTransport extends winston.Transport {
  async log(info, callback) {
    const { level, message } = info;
    try {
      await pool.query("INSERT INTO logs (level, message) VALUES ($1, $2)", [level, message]);
    } catch (error) {
      console.error("Error logging to DB:", error);
    }
    callback();
  }
}

// Winston Logger Configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, "app.log") }), // Now uses the created directory
    new PostgresTransport(),
  ],
});

export default logger;
