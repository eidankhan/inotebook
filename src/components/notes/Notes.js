import React, { useContext, useEffect } from 'react'
import noteContext from "../../context/notes/NoteContext";
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';


export const Notes = () => {
    const data = useContext(noteContext)
    const {notes, fetchAllNotes} = data;

    useEffect(() => {
        fetchAllNotes();
    }, [])

    return (
        <div className="container">
        <AddNote/>
        <h2 className="my-2"> Your Notes</h2>
        <div className="row" >
            {notes.map( (n) => { return <div className="col-md-4 my-2" key={n._id}> <NoteItem note={n} /> </div>  })}
        </div>
        </div>
    )
}
