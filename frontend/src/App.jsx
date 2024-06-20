import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";


function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />

        <Route path="/register" element={!user ? <Register /> : <Home/>} />
        <Route path="/login" element={!user ? <Login /> : <Home/>} />

        {user && (
          <>
            <Route path="/movies" element={<Home type="Movie"/>} />
            <Route path="/series" element={<Home type="Series"/>} />
            <Route path="/watch" element={<Watch />} />
          </>
        )}

      </Routes>
    </Router>
  );
}

export default App
