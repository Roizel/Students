import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./components/auth/register/registerPage";
import LoginPage from "./components/auth/login/loginPage";
import HomePage from "./components/common/home";

function App() {
  return (
    <Router>
        <Navbar/>
      <div className="container">
        <Routes >
           <Route exact path="/" element = {<HomePage/>}></Route>
           <Route exact path="/register" element = {<RegisterPage/>}></Route>
           <Route exact path="/login" element = {<LoginPage/>}></Route>
        </Routes >
      </div>
    </Router>
  );
}

export default App;