import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const BASE_URL = "http://localhost:3000/api/notes";

  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const response = await fetch(`${BASE_URL}/fetchnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4ZTNlNGRjN2NiOGM4YjAxYjQ5YjQ4In0sImlhdCI6MTYzNjcxMjY1MX0.5adJZTILat9xaKZiGTF2yjYfMVj9MZnjWoBhV122qfU",
      },
    });

    const data = await response.json();
    setNotes(data)
  };
  // Add Note
  const addNote = async (n) => {
    console.log('note:'+n.title+","+n.description+","+n.tag)
    const response = await fetch(`${BASE_URL}/addnote`, {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4ZTNlNGRjN2NiOGM4YjAxYjQ5YjQ4In0sImlhdCI6MTYzNjcxMjY1MX0.5adJZTILat9xaKZiGTF2yjYfMVj9MZnjWoBhV122qfU",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title: n.title, description:n.description, tag:n.tag})
    });

    const data = await response.json();
    console.log('Data:'+data)
    // setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    console.log("Deleting note with id " + noteId);
    const response = await fetch(`${BASE_URL}/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4ZTNlNGRjN2NiOGM4YjAxYjQ5YjQ4In0sImlhdCI6MTYzNjcxMjY1MX0.5adJZTILat9xaKZiGTF2yjYfMVj9MZnjWoBhV122qfU",
      }
    });
    const data = response.json();
    console.log('Data:'+data);
    //fetchAllNotes();
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, fetchAllNotes ,addNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
