import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token",res.data.token);

      navigate("/convert");

    }catch(error){

      console.error(error);
      alert("Login Failed");

    }

  };

  return (

    <div className="container">
      <div className="card">

        <h2>Login</h2>

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

        <button onClick={handleLogin}>
          Login
        </button>

        <p style={{marginTop:"15px"}}>
          New user?{" "}
          <span
            style={{cursor:"pointer",fontWeight:"bold"}}
            onClick={()=>navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>

  );
}

export default Login;