import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "../config/axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    axios
      .post("/users/login", { email: formData.email, password: formData.password })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token",res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register" className="register-link-text">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
