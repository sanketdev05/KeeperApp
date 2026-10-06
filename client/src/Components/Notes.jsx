// import { useState } from "react";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

function Notes(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <div className="note-content">
        <h1>{props.title}</h1>
        <p className="content">{props.content}</p>
        <p className="created_time">{props.createdat}</p>
      </div>
      <div className="note-edit">
        <Button
          // onClick={handleClick}
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
  );
}

export default Notes;
