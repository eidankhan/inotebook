import React, { useContext, useState } from "react";
import noteContext from "../../context/notes/NoteContext";


export const AddNote = () => {

  const context = useContext(noteContext)
  const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:"General"})
  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value})
  }
  const handlOnClinck = (e) => {
      e.preventDefault();
      addNote(note);

  }
  return (
    <div>
      <h2 className="my-3"> Add Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title 
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handlOnClinck}>
          Save Note
        </button>
      </form>
    </div>
  );
};
