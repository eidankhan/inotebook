import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "618e57c11e42676a21bbb955",
      user: "618e3e4dc7cb8c8b01b49b48",
      title: "The Conquest of Happiness",
      description: "Be kind to a stranger",
      tag: "Personal",
      date: "2021-11-12T12:02:09.847Z",
      __v: 0,
    },
    {
      _id: "718e65af11b667f53cc0cb39",
      user: "618e3e4dc7cb8c8b01b49b48",
      title: "The Conquest of Happiness",
      description: "Be kind to a stranger",
      tag: "Personal",
      date: "2021-11-12T13:01:35.320Z",
      __v: 0,
    },
    {
        _id: "818e57c11e42676a21bbb955",
        user: "618e3e4dc7cb8c8b01b49b48",
        title: "The Conquest of Happiness",
        description: "Be kind to a stranger",
        tag: "Personal",
        date: "2021-11-12T12:02:09.847Z",
        __v: 0,
      },
      {
        _id: "918e65af11b667f53cc0cb39",
        user: "618e3e4dc7cb8c8b01b49b48",
        title: "The Conquest of Happiness",
        description: "Be kind to a stranger",
        tag: "Personal",
        date: "2021-11-12T13:01:35.320Z",
        __v: 0,
      },
      {
        _id: "518e57c11e42676a21bbb955",
        user: "618e3e4dc7cb8c8b01b49b48",
        title: "The Conquest of Happiness",
        description: "Be kind to a stranger",
        tag: "Personal",
        date: "2021-11-12T12:02:09.847Z",
        __v: 0,
      },
      {
        _id: "418e65af11b667f53cc0cb39",
        user: "618e3e4dc7cb8c8b01b49b48",
        title: "The Conquest of Happiness",
        description: "Be kind to a stranger",
        tag: "Personal",
        date: "2021-11-12T13:01:35.320Z",
        __v: 0,
      },
  ];

  const [notes, setNotes] = useState(initialNotes)

  // Add Note
  const addNote = (n) => {

    const note ={
        _id: "418e65af11b667f53cc0cb39d",
        user: "618e3e4dc7cb8c8b01b49b48",
        title: n.title,
        description: n.description,
        tag: "Personal",
        date: "2021-11-12T13:01:35.320Z",
        __v: 0,
    };

    setNotes(notes.concat(note));
  }

  // Delete Note
  const deleteNote = (id) => {
    console.log('Deleting note with id '+id);
    const newNotes = notes.filter( (note) => { return note._id !== id})
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
