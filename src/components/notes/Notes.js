import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../../context/notes/NoteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
import { useNavigate } from "react-router";

export const Notes = (props) => {
  const {showAlert} = props;
  const data = useContext(noteContext);
  const { notes, fetchAllNotes, updateNote } = data;

  const [note, setNote] = useState({editTitle:"", editDescription:"", editTag:"General", id:""})

  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token"))
    {  
      fetchAllNotes();
    }
    else{
      navigate("/login")
    }
  }, []);

  const currentNote = (currentNote) => {
    ref.current.click();
    setNote({editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag, id:currentNote._id})
  };


  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value})
  }
  const handlOnClinck = (e) => {
      e.preventDefault();
      updateNote(note.id, note.editTitle, note.editDescription, note.editTag)
      refClose.current.click();
      showAlert("Updated note successfully", "success")
  }

  return (
    <div className="container">
      <AddNote showAlert={showAlert}/>
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
                  ref={refClose}
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
              <NoteItem note={n} currentNote={currentNote} showAlert={showAlert} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};
