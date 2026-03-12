import React from "react";
import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Landing() {

const navigate = useNavigate();

return ( 
    <div className="container">

        <div className="card">

            <h1><FaRocket/> File Converter Pro</h1>

            <p className="subtitle">
            Convert Images, PDF, TXT and DOCX files instantly.
            </p>

            <button
            style={{marginBottom:"10px"}}
            onClick={() => navigate("/login")}
            >
            Login
            </button>

            <button
            onClick={() => navigate("/register")}
            >
            Register
            </button>

        </div>
    </div>
);

}

export default Landing;
