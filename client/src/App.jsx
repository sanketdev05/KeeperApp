import { useEffect, useState } from "react";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Note from "./Components/Notes.jsx";
// import notes from "./allnotes.jsx";
import CreateNotes from "./Components/CreateNotes.jsx";
import "./App.css";

function App() {
  const [notes, setNote] = useState([]);

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

  function createNote() {
    addNote();
  }

  function deleteNode(id) {
    setNote((prev) => {
      return prev.filter((noteItem, index) => {
        return index != id;
      });
    });
  }

  return (
    <>
      <Header />
      <main>
        <CreateNotes onAdd={createNote} />

        <div className="allnotes">
          {notes.map((noteItem, index) => {
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
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                createdat={formattedDate}
                onDelete={deleteNode}
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
