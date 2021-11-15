import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext";
import { NoteItem } from './NoteItem';

export const Notes = () => {
    const data = useContext(noteContext)
    const {notes, setNotes} = data;
    return (
        <div className="row" >
            {notes.map( (n) => { return <div className="col-md-4 my-2" key={n._id}> <NoteItem note={n} /> </div>  })}
        </div>
    )
}
