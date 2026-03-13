import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Converter from "./pages/Converter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Compress from "./pages/Compress";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectredRoute";

function App(){

return(

<BrowserRouter>

  <Navbar/>

  <div className="main-content">
    <Routes>

      <Route path="/" element={<Landing/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route 
        path="/convert" 
        element={
          <ProtectedRoute>
            <Converter/>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/compress" 
        element={
          <ProtectedRoute>
            <Compress/>
          </ProtectedRoute>
        }
      />

    </Routes>
  </div>
  
  <Footer/>

</BrowserRouter>

)

}

export default App;