import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./Components/NavBar";


function App() {
  return (
    <Router>

    <Routes>
      <Route path='/' Component={Login}></Route>
      <Route path='/home' Component={Home}></Route>
    </Routes>
    </Router>
  );
}

export default App;
