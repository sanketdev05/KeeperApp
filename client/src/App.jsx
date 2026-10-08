import { useEffect, useState } from "react";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Note from "./Components/Notes.jsx";
// import notes from "./allnotes.jsx";
import CreateNotes from "./Components/CreateNotes.jsx";
import "./App.css";

function App() {
  const [notes, setNote] = useState([]);
  const [isEditableId, setIsEditableId] = useState(null);

  async function addNote() {
    try {
      const response = await fetch("http://localhost:3001/");

      const result = await response.json();

      if (result.success) {
        setNote(result.data);
      }
    } catch (err) {
      console.error("Fetch Error", err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    addNote();
  }, []);


  async function handleSubmit(title, content) {
    try {
      const response = await fetch("http://localhost:3001/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      const result = await response.json();
      if (result.success) {
        addNote();
      }
    } catch (err) {
      console.error("Error connecting to the backend:", err);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch("http://localhost:3001/delete", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNote((prev) => {
          return prev.filter((noteItem) => {
            return noteItem.id != id;
          });
        });
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  function handleEdit(id) {
    setIsEditableId(id);
  }

  function handleCancel() {
    setIsEditableId(null);
  }

  async function handleUpdate(id, title, content) {
    try {
      const response = await fetch("http://localhost:3001/api/notes/modify", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          title: title,
          content: content,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setNote((prev) => {
          return prev.map((noteItem) => {
            return noteItem.id === id
              ? { ...noteItem, title, content }
              : noteItem;
          });
        });
      }
      setIsEditableId(null);
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  return (
    <>
      <Header />
      <main>
        <CreateNotes onAdd={handleSubmit} />
        <div className="allnotes">
          {notes.map((noteItem) => {
            const date = new Date(noteItem.created_at);
            const formattedDate = date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Note
                key={noteItem.id}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                createdat={formattedDate}
                isEditing={isEditableId === noteItem.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onUpdate={handleUpdate}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
