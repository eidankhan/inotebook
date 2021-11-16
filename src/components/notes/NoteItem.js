import React, { useContext } from "react";
import noteContext from "../../context/notes/NoteContext";

export const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, currentNote } = props;

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{currentNote(note)}}></i>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};
