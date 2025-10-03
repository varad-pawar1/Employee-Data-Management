import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve DB path relative to the backend working directory by default
const defaultDbPath = path.resolve(process.cwd(), "Data_Base", "employees.db");
const dbPath = process.env.DB_PATH || defaultDbPath;

export type SQLiteDatabase = sqlite3.Database;

export const connectDB = (): Promise<SQLiteDatabase> => {
    return new Promise((resolve, reject) => {
        // Ensure directory exists
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
                reject(err);
            } else {
                console.log("Connected to SQLite database.");

                db.run(
                    `CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            position TEXT NOT NULL
          )`,
                    (runErr) => {
                        if (runErr) {
                            reject(runErr);
                        } else {
                            resolve(db);
                        }
                    }
                );
            }
        });
    });
};


