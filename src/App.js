import {  BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./components/auth/register/registerPage";
import LoginPage from "./components/auth/login/loginPage";
import HomePage from "./components/common/home";
import CoursePage from "./components/common/courses";
import CreateCoursePage from "./components/common/courses/create/createCoursePage";
import EditStudentPage from "./components/common/edit/student/editStudentPage";
import StudentPage from "./components/common/edit/student";
import EditCoursePage from "./components/common/edit/course/editCoursePage";
import StudentCourse from "./components/courseforstudent/index";
import RegisterFb from "./components/auth/register/registerFb";

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
      <div className="container">
        <Routes >
           <Route exact path="/students" element = {<StudentPage/>}></Route>
           <Route exact path="/register" element = {<RegisterPage/>}></Route>
           <Route exact path="/login" element = {<LoginPage/>}></Route>
           <Route exact path="/courses" element = {<CoursePage/>}></Route>
           <Route exact path="/studentCourses" element = {<StudentCourse/>}></Route>
           <Route exact path="/registerFb/:token" element = {<RegisterFb/>}></Route>
           <Route exact path="/createCourse" element = {<CreateCoursePage/>}></Route>
           <Route exact path="/student/edit/:id" element = {<EditStudentPage/>}></Route>
           <Route exact path="/course/edit/:id" element = {<EditCoursePage/>}></Route>
           <Route exact path="/" element = {<HomePage/>}></Route>
        </Routes >
      </div>
    </BrowserRouter>
  );
}

export default App;