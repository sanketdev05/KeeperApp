import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

db.query(
  `CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) `,
)
  .then(() => console.log("Notes table is ready"))
  .catch((err) => console.error("Error creating table:", err));

app.get("/", async (req, res) => {
  try {
    const newnotes = await db.query(`SELECT * FROM notes`)
    // console.log(newnotes)
    res.status(201).json({
      success: true,
      data: newnotes.rows,
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error occurred" });
  }
});
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await db.query(
      `INSERT INTO notes (title, content) VALUES ($1, $2)`,
      [title, content],
    );
    res.status(201).json({
      success: true,
      data: note.rows[0],
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error occurred" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
