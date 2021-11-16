import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const BASE_URL = "http://localhost:3000/api/notes";

  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const response = await fetch(`${BASE_URL}/fetchnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setNotes(data)
  };
  // Add Note
  const addNote = async (note) => {
    console.log('note:'+note.title+","+note.description+","+note.tag)
    const response = await fetch(`${BASE_URL}/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title: note.title, description:note.description, tag:note.tag})
    });

    const data = await response.json();
    console.log('Data:'+data)
    fetchAllNotes();
  };

  // Update Note
  const updateNote = async (id, title, description, tag) => {
    console.log("ID:"+id+", Title:"+title,", Desc:"+description+", tag:"+tag)
    const response = await fetch(`${BASE_URL}/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title: title, description:description, tag:tag})
    });

    const data = await response.json();
    console.log('Data:'+data)
    fetchAllNotes();
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    console.log("Deleting note with id " + noteId);
    const response = await fetch(`${BASE_URL}/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      }
    });
    const data = response.json();
    console.log('Data:'+data);
    fetchAllNotes();
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, fetchAllNotes ,addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
