import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

db.connect();

app.get("/", async (req, res) => {
  try {
    const newnotes = await db.query(`SELECT * FROM notes ORDER BY id DESC;`);
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

app.patch("/api/notes/modify", async (req, res) => {
  const { id, title, content } = req.body;

  try {
    const updatedNote = await db.query(
      `UPDATE notes SET title = $2, content = $3, updated_at = CURRENT_TIMESTAMP  WHERE id = $1 RETURNING *`,
      [id, title, content],
    );
    res.status(201).json({
      success: true,
      data: updatedNote.rows[0],
    });
  } catch (err) {
    console.error("Erro:", err);
  }
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    await db.query(`DELETE FROM notes WHERE id = $1`, [id]);
    res.status(201).json({
      success: true,
    });
    console.log("deleted succesfully");
  } catch (err) {
    console.error("Error:", err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
