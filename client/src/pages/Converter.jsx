import React, { useState, useRef } from "react";
import API from "../api";
import "../App.css";
import {FaRocket } from "react-icons/fa";
import { SiTicktick, SiConvertio} from "react-icons/si";
import { MdSmsFailed, MdLogout} from "react-icons/md";

function Converter() {

  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const inputRef = useRef();

  const handleFile = (selectedFile) => {

    setFile(selectedFile);
    setFormat("");

    const ext = selectedFile.name.split(".").pop().toLowerCase();

    setMessage(`Detected file type: ${ext.toUpperCase()}`);

  };

  const getFormats = () => {

    if (!file) return [];

    const ext = file.name.split(".").pop().toLowerCase();

    if (["png","jpg","jpeg","webp"].includes(ext))
      return ["png","jpg","jpeg","webp","pdf"];

    return [];

  };

  const handleConvert = async () => {

    if (!file) {
      setMessage("Upload an image first");
      return;
    }

    if (!format) {
      setMessage("Select format");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", file);

    let url="";

    if(format==="pdf")
      url="/image-to-pdf";
    else{
      formData.append("format",format);
      url="/convert-image";
    }

    try{

      setMessage("Converting...");
      setProgress(0);

      const res = await API.post(url, formData, {
        headers:{
          Authorization:`Bearer ${token}`
        },
        responseType:"blob",
        onUploadProgress:(e)=>{
          if(e.total){
            const percent=Math.round((e.loaded*100)/e.total);
            setProgress(percent);
          }
        }
      });

      const blob=new Blob([res.data]);
      const fileURL=URL.createObjectURL(blob);

      const link=document.createElement("a");
      link.href=fileURL;
      link.download=`converted.${format}`;
      link.click();

      URL.revokeObjectURL(fileURL);

      setMessage("Conversion Successful");
      setStatus("success");

    }
    catch(err){

      console.error(err);
      setMessage("Conversion Failed");
      setStatus("error");
    }

  };

  return(

    <div className="container">

      <div className="card">

        <button
          className="logout-btn"
          onClick={()=>{
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout <MdLogout />
        </button>

        <h1>
          <FaRocket className="title-icon"></FaRocket>
          File Converter Pro
        </h1>

        <p className="subtitle">
          Convert images to different formats
        </p>

        <div
          className="drop-area"
          onClick={()=>inputRef.current.click()}
        >

          {file ? (
            <div className="preview">
              <img 
                src={URL.createObjectURL(file)} 
                alt="preview"
                className="preview-img" 
              />
              <p>{file.name}</p>
            </div>
          ) : (
            <p>Click to upload image</p>
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputRef}
            onChange={(e)=>handleFile(e.target.files[0])}
          />

        </div>

        {file && (

          <select
            value={format}
            onChange={(e)=>setFormat(e.target.value)}
          >

            <option value="">Select Format</option>

            {getFormats().map(f=>(
              <option key={f} value={f}>
                {f.toUpperCase()}
              </option>
            ))}

          </select>

        )}

        <button onClick={handleConvert}>
          Convert File <SiConvertio />
        </button>

        {progress>0 &&(
          <div className="progress-bar">
            <div className="progress" style={{width:`${progress}%`}}></div>
          </div>
        )}

        {message && 
          <p className="message">
              {status === "success" && (
                <SiTicktick className="msg-icon msg-success"/>
              )}

              {status === "error" && (
                <MdSmsFailed className="msg-icon msg-error"/>
              )}
              {message}
          </p>}

      </div>

    </div>

  );

}

export default Converter;