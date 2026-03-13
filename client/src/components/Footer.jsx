import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaRobot, FaRocket } from "react-icons/fa";
import logo from "../assets/pixeditor-logo.png";

function Footer() {

  const year = new Date().getFullYear();

  return (

    <footer className="footer">

      <div className="footer-container">
        
        <div className="footer-logo">
            <div className="logo-circle">
              <img src={logo}/>
            </div>
        </div>

        <div className="footer-left">
          <p>Fast image conversion & compression tools.</p>
        </div>

        <div className="footer-center">
          <Link to="/convert">Convert</Link>
          <Link to="/compress">Compress</Link>
          <Link to="/history">History</Link>
        </div>

        <div className="footer-social">

            <a
                href="https://github.com/Subha2707"
                target="_blank"
                rel="noopener noreferrer"
            >
               <FaGithub/> GitHub
            </a>

            <a
                href="https://www.linkedin.com/in/subhadip-dey-7019632b7/"
                target="_blank"
                rel="noopener noreferrer"
            >
               <FaLinkedin/> LinkedIn
            </a>

            <a
                href="https://www.instagram.com/dreaming_sane/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaInstagram/> Instagram
            </a>

        </div>

        <div className="footer-right">
          <p>© {year} FileConverter</p>
          <p>Built with MERN Stack <FaRobot/></p>
        </div>

      </div>

    </footer>

  );

}

export default Footer;