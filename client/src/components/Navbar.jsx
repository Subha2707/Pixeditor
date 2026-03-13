import React, { useState } from "react";
import { FaBars, FaCompressAlt, FaExchangeAlt, FaHistory } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pixeditor-logo.png";

function Navbar() {

  const navigate = useNavigate();
  const [menuOpen,setMenuOpen] = useState(false);

  return (

    <div className="navbar">

      <div className="logo" onClick={()=>navigate("/")}>
        <div className="logo-circle">
          <img src={logo} alt="Pixeditor Logo" />
        </div>

        <span>Pixeditor</span>
      </div>

      <div className={`nav-links ${menuOpen ? "open":""}`}>

        <button onClick={()=>navigate("/convert")}><FaExchangeAlt/> Convert</button>

        <button onClick={()=>navigate("/about")}><TbListDetails /> About</button>

        <button onClick={()=>navigate("/compress")}><FaCompressAlt/>Compress</button>

        <button
          onClick={()=>{
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <MdLogout /> Logout
        </button>

      </div>

      <div
        className="hamburger"
        onClick={()=>setMenuOpen(!menuOpen)}
      >
        <FaBars/>
      </div>

    </div>

  );
}

export default Navbar;