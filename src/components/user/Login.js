import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {
  const {showAlert} = props;

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({email:"", password:""})
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }


  const onFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const data = await response.json();
    if(data.success){
      localStorage.setItem("token", data.authToken);
      showAlert("You are logged in successfully","success");
      navigate('/');
    }
    else{
      showAlert("Invalid credentials","danger");
    }

  }
  return (
    <div className="container my-3">
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
            required={true}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            required={true}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
