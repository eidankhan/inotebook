
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
import { Login } from './components/user/Login';
import { Signup } from './components/user/Signup';

const App = () => {

  return (
    <NoteState>
    <Router>
      <Navbar/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
    </Router>
    </NoteState>
  )  
}

export default App;