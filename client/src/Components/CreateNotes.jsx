import { useState } from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Zoom } from "@mui/material";

function CreateNote(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    // console.log("handleChange fired", event.target.name, event.target.value);

    setNewNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleClick() {
    setIsExpanded(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewNote({
      title: "",
      content: "",
    });
    props.onAdd(newNote.title, newNote.content);
  }

  return (
    <div className="form-content">
      <form className="createnote" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            className="inputfield"
            name="title"
            type="text"
            value={newNote.title}
            placeholder="Type title...."
            onChange={handleChange}
          />
        )}
        <textarea
          className="inputfield"
          name="content"
          type="text"
          value={newNote.content}
          placeholder="Type something...."
          rows={isExpanded ? 5 : 1}
          onChange={handleChange}
          onClick={handleClick}
        />

        {isExpanded && (
          <Zoom in={true}>
            <Fab type="submit">
              <Add />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateNote;
