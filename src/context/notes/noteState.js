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
  const addNote = (n) => {
    const note = {
      _id: "418e65af11b667f53cc0cb39d",
      user: "618e3e4dc7cb8c8b01b49b48",
      title: n.title,
      description: n.description,
      tag: "Personal",
      date: "2021-11-12T13:01:35.320Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = (id) => {
    console.log("Deleting note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, fetchAllNotes ,addNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
