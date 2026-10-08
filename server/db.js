import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// sql query in express or node code 
// db.connect();

// db.query(
//   `CREATE TABLE IF NOT EXISTS notes (
//     id SERIAL PRIMARY KEY,
//     title TEXT NOT NULL,
//     content TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   ) `,
// )
//   .then(() => console.log("Notes table is created"))
//   .catch((err) => console.error("Error creating table:", err));

// db.query(
//   `ALTER TABLE notes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`,
// )
//   .then(() => console.log("New Column is created"))
//   .catch((err) => console.error("Error creating table:", err));

export default db