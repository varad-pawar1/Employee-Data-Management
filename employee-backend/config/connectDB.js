import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || path.join(__dirname, "../Data_Base/employees.db");

export const connectDB = () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("❌ Error opening database:", err.message);
                reject(err);
            } else {
                console.log("✅ Connected to SQLite database.");

                db.run(
                    `CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            position TEXT NOT NULL
          )`,
                    (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(db);
                        }
                    }
                );
            }
        });
    });
};
