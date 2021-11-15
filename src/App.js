
import React from 'react'
import Navbar from './components/Navbar'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';

const App = () => {

  return (
    <NoteState>
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}/>
        </Routes>
    </Router>
    </NoteState>
  )  
}

export default App;