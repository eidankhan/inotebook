import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Signup = (props) => {
  const {showAlert} =  props;
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/createUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: user.name, email: user.email, password: user.password})
    });
    const data = await response.json();
    if(data.success){
        localStorage.setItem("token",data.authToken)
        showAlert("Your account has been created successfully", "success")
        navigate('/')
    }
    else{
        showAlert("Error occured while creating account", "danger")
    }
  };

  return (
    <div className="container my-3">
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={user.name}
            required={true}
          />
        </div>
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
            value={user.email}
            required={true}
          />
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
            value={user.password}
            required={true}
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};
