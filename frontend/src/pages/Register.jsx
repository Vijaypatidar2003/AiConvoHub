import React, { useState , useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../context/userContext'
import './Login.css'

const Register = () => {
  const {setUser}  =  useContext(UserContext); 
  const navigate = useNavigate();
  const [formData,setFormData] = useState({email:"",password:""});
    const submitHandler = (e)=>{
      e.preventDefault();
      axios.post("/users/register",{email:formData.email,password:formData.password})
      .then((res)=>{
        console.log(res.data);
        localStorage.setItem('token',res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
    }
    const changeHandler = (e)=>{
      const {name,value} = e.target
        setFormData((prevData)=>(
            {...prevData,[name]:value}
        ))
    }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
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
              name='password'
              value={formData.password}
              onChange={changeHandler}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
        <p className="register-link">
          Already have an account?{' '}
          <Link to="/login" className="register-link-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register