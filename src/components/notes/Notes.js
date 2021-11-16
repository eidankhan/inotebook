import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../../context/notes/NoteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";

export const Notes = () => {
  const data = useContext(noteContext);
  const { notes, fetchAllNotes } = data;

  const [note, setNote] = useState({editTitle:"", editDescription:"", editTag:"General"})

  const ref = useRef(null);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const currentNote = (currentNote) => {
    ref.current.click();
    setNote({editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag})
  };


  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value})
  }
  const handlOnClinck = (e) => {
      e.preventDefault();
      console.log('Updating note:'+note);
  }

  return (
    <div className="container">
      <AddNote />
      <div>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      name="editTitle"
                      value={note.editTitle}
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDescription"
                      name="editDescription"
                      value={note.editDescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editTag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTag"
                      name="editTag"
                      value={note.editTag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" onClick={handlOnClinck} className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="my-2"> Your Notes</h2>
      <div className="row">
        {notes.map((n) => {
          return (
            <div className="col-md-4 my-2" key={n._id}>
              {" "}
              <NoteItem note={n} currentNote={currentNote} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};
