import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try{

      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registration successful! Please login.");

      navigate("/login");   // go to login page

    }catch(err){

      console.error(err);
      alert("Registration failed");

    }

  };

  return (
    <div className="container">
      <div className="card">

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p style={{marginTop:"15px"}}>
          Already registered?{" "}
          <span
            style={{cursor:"pointer",fontWeight:"bold"}}
            onClick={()=>navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;