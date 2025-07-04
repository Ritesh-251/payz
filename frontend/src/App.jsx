import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signUp";

function App() {

  return (
    <div>
      <BrowserRouter>
	    <Routes>
        <Route path='/' element={<Signup/>}/>
        {/* <Route path="signIn" element={<signIn />} />
        <Route path="dashboard" element={<dashboard />} />
        <Route path="/send" element={<send />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
