
import React, { useState } from 'react'
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
import Alert from './components/Alert';

const App = () => {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert} />
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />}/>
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
    </Router>
    </NoteState>
  )  
}

export default App;