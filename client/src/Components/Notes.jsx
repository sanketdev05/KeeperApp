import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { CloseOutlined } from "@mui/icons-material";
import { Send } from "@mui/icons-material";
import { useState } from "react";

function Notes(props) {
  const [tempNote, setTempNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTempNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleEditClick() {
    setTempNote({
      title: props.title,
      content: props.content,
    });
    props.onEdit(props.id);

  }

  function handleSaveClick() {
    props.onUpdate(props.id, tempNote.title, tempNote.content, );
  }

  function handleClick() {
    if (props.isEditing) {
      props.onCancel(props.id);
    } else {
      props.onDelete(props.id);
    }
  }

  

  return (
    <div className="note">
      {props.isEditing ? (
        <div>
          <form className="edit_note">
            <input
              name="title"
              type="text"
              value={tempNote.title}
              placeholder="Type title...."
              onChange={handleChange}
            />

            <textarea
              name="content"
              type="text"
              value={tempNote.content}
              placeholder="Type something...."
              rows={1}
              onChange={handleChange}
            />
          </form>
          <div className="note-edit">
            <Button
              onClick={handleSaveClick}
              variant="outlined"
              startIcon={<Send />}
            ></Button>

            <Button
              onClick={handleClick}
              variant="outlined"
              startIcon={<CloseOutlined />}
            ></Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="note-content">
            <h1>{props.title}</h1>
            <p className="content">{props.content}</p>
            <p className="created_time">Created At: {props.createdat}</p>
            { props.isEditedNote && <p className="created_time">Updated At: {props.updatedat}</p> }

          </div>
          <div className="note-edit">
            <Button
              onClick={handleEditClick}
              variant="outlined"
              startIcon={<Edit />}
            ></Button>

            <Button
              onClick={handleClick}
              variant="outlined"
              startIcon={<Delete />}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
