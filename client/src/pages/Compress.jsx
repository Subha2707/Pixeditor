import React, { useState, useRef } from "react";
import API from "../api";
import ReactCompareImage from "react-compare-image";
import debounce from "lodash.debounce";
import "../App.css";
import { SiTicktick } from "react-icons/si";
import { MdSmsFailed } from "react-icons/md";
import { FaCompressAlt, FaDownload } from "react-icons/fa";

function Compress() {

  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [targetSize, setTargetSize] = useState(200);
  const [mode, setMode] = useState("quality");

  const [originalPreview, setOriginalPreview] = useState(null);
  const [compressedPreview, setCompressedPreview] = useState(null);

  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  const [message, setMessage] = useState("");
  const[status, setStatus] = useState("");

  const [downloadURL, setDownloadURL] = useState(null);

  const inputRef = useRef();

  /* ------------------------------
     Handle file upload
  ------------------------------ */

  const handleFile = (selectedFile) => {

    setFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);

    setOriginalPreview(previewURL);

    const sizeKB = (selectedFile.size / 1024).toFixed(2);

    setOriginalSize(sizeKB);

    setMessage(`Original size: ${sizeKB} KB`);

  };

  /* ------------------------------
     Compress Image
  ------------------------------ */

  const handleCompress = async () => {

    if (!file) {
      setMessage("Upload an image first");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("mode", mode);

    if (mode === "quality") {
      formData.append("quality", quality);
    } else {
      formData.append("targetSizeKB", targetSize);
    }

    try {

      const res = await API.post(
        "/compress-image",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob"
        }
      );

      const blob = new Blob([res.data]);

      const previewURL = URL.createObjectURL(blob);

      setCompressedPreview(previewURL);
      setDownloadURL(previewURL);

      const sizeKB = (blob.size / 1024).toFixed(2);

      setCompressedSize(sizeKB);

      setMessage("Compression Successful");
      setStatus("success");

    } 
    catch (err) {

      console.error(err);

      setMessage("Compression Failed");
      setStatus("error");

    }

  };

  const previewCompression = debounce(async (file, quality) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", "quality");
    formData.append("quality", quality);

    const res = await API.post(
        "/compress-image",
        formData,
        {
        headers:{Authorization:`Bearer ${token}`},
        responseType:"blob"
        }
    );

    const blob = new Blob([res.data]);

    const url = URL.createObjectURL(blob);

    setCompressedPreview(url);

}, 400);


  /* ------------------------------
     Saved Percentage
  ------------------------------ */

  let savedPercent = null;

  if (originalSize && compressedSize) {

    savedPercent = (
      ((originalSize - compressedSize) / originalSize) * 100
    ).toFixed(1);

  }

  return (

    <div className="container">

      <div className="card">

        <h1>🗜 Image Compressor</h1>

        <p className="subtitle">
          Reduce image size while keeping good quality
        </p>


        {/* Upload Area */}

        <div
          className="drop-area"
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
        >

          {file ? (
            <div className="preview">
              <img
                src={originalPreview}
                alt="preview"
                className="preview-img"
              />
              <p>{file.name}</p>
            </div>
          ) : (
            <p>Drag & Drop Image Here or Click</p>
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputRef}
            onChange={(e) => handleFile(e.target.files[0])}
          />

        </div>


        {/* Compression Mode */}

        <div className="compress-mode">

          <label>
            <input
              type="radio"
              value="quality"
              checked={mode === "quality"}
              onChange={() => setMode("quality")}
            />
            Quality
          </label>

          <label>
            <input
              type="radio"
              value="size"
              checked={mode === "size"}
              onChange={() => setMode("size")}
            />
            Target Size
          </label>

        </div>


        {/* Quality Slider */}

        {mode === "quality" && (

          <div className="compress-control">

            <p>Quality: {quality}%</p>

            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => {
                setQuality(e.target.value);
                previewCompression(file, e.target.value);
              }}
            />

          </div>

        )}


        {/* Target Size */}

        {mode === "size" && (

          <div className="compress-control">

            <p>Target Size (KB)</p>

            <input
              type="number"
              step="10"
              value={targetSize}
              onChange={(e) => setTargetSize(e.target.value)}
            />

          </div>

        )}


        <button onClick={handleCompress}>
          Compress Image <FaCompressAlt/>
        </button>


        {/* Compression Stats */}

        {compressedPreview && (

          <div className="compression-stats">

            <div className="stat-row">
                <span>Original</span>
                <span>{originalSize} KB</span>
            </div>

            <div className="stat-row">
                <span>Compressed</span>
                <span>{compressedSize} KB</span>
            </div>

            <div className="stat-row saved">
                <span>Saved</span>
                <span>{savedPercent}%</span>
            </div>

          </div>

        )}

        {/* Size Comparison Bar */}

        {compressedPreview && (

            <div className="size-bar">
                    
                <div
                    className="compressed-bar"
                    style={{
                        width: `${(compressedSize / originalSize) * 100}%`
                    }}
                ></div>

            </div>

        )}

        {/* Image Comparison */}

        {compressedPreview && (

          <div className="compare-container">

            <ReactCompareImage
              leftImage={originalPreview}
              rightImage={compressedPreview}
              sliderLineWidth={3}
              sliderLineColor="#00ffcc"
              handleSize={40}
              hover={false}
            />

          </div>

        )}

        {downloadURL && (

            <button
                className="download-btn"
                onClick={() => {

                const link = document.createElement("a");

                link.href = downloadURL;
                link.download = "compressed-image.jpg";

                link.click();

                }}
            >
                Download Compressed Image <FaDownload/>
            </button>

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
          </p>
        }

      </div>

    </div>

  );

}

export default Compress;