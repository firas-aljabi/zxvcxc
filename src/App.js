import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./Components/NavBar";
import Customers from "./pages/Customers2";
import AdminHome from "./pages/AdminHome";
import Transactions from "./pages/Transactions";


function App() {
  return (
    <Router>

    <Routes>

    <Route path='/' Component={Login}></Route>
    <Route path='/asd' Component={Customers}></Route>

    <Route path='/home' Component={Home}></Route>
    <Route path='/adminhome' Component={AdminHome}></Route>
    <Route path='/transaction' Component={Transactions}></Route>

    </Routes>
    </Router>
  );
}

export default App;
