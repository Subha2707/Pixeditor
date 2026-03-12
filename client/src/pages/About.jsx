import React,{useEffect,useState} from "react";
import API from "../api";
import { FaRocket, FaImage, FaCompressAlt, FaHistory } from "react-icons/fa";

function About(){

const [history,setHistory] = useState([]);

useEffect(()=>{


const token = localStorage.getItem("token");

  API.get(
    "/history",
    {headers:{Authorization:`Bearer ${token}`}}
  )
  .then(res=>setHistory(res.data))
  .catch(err=>console.error(err));


},[]);

return(


  <div className="about-page">

    {/* ABOUT SECTION */}

    <div className="about-card">

      <h1 className="about-title">
        <FaRocket className="title-icon"/>
        FileConverter Pro
      </h1>

      <p className="about-text">
        FileConverter Pro is a modern web application that allows users
        to convert and compress images instantly. Built using the MERN
        stack, it provides fast, secure and efficient file processing
        directly from your browser.
      </p>

    </div>


    {/* FEATURES SECTION */}

    <div className="features-grid">

      <div className="feature-card">

        <FaImage className="feature-icon"/>

        <h3>Image Conversion</h3>

        <p>
          Convert images to multiple formats including
          PNG, JPG, JPEG, WEBP and PDF instantly.
        </p>

      </div>


      <div className="feature-card">

        <FaCompressAlt className="feature-icon"/>

        <h3>Smart Compression</h3>

        <p>
          Compress images using adjustable quality
          and target size for optimal performance.
        </p>

      </div>


      <div className="feature-card">

        <FaHistory className="feature-icon"/>

        <h3>Conversion History</h3>

        <p>
          Track your previous conversions and
          manage files efficiently.
        </p>

      </div>

    </div>


    {/* HISTORY SECTION */}

    <div className="history-section">

      <h2>
        <FaHistory className="title-icon"/>
        Your Conversion History
      </h2>

      {history.length === 0 ?(

        <p className="empty-history">
          No conversions yet <FaRocket/>
        </p>

      ):(
        
        <div className="history-list">

          {history.map(item=>(

            <div className="history-item" key={item._id}>

              <span>{item.originalFile}</span>

              <span className="format-badge">
                {item.format.toUpperCase()}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>


);

}

export default About;
