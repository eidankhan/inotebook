import React, {useContext, useEffect} from 'react'

import noteContext from '../context/notes/NoteContext'

export const Home = () => {
    const data = useContext(noteContext);
    useEffect(() => {
       data.updateState()
       // eslint-disable-next-line
    }, [])
    return (
        <div>
            <p> My name is {data.state.name} and I am {data.state.age} years old. </p>
        </div>
    )
}
