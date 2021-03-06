import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/auth';
import { useNavigate } from 'react-router';
import { Modal } from 'antd';

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { isAuth, user, isAdmin } = useSelector(redux => redux.auth);
    const { confirm } = Modal;
    const onClickLogout = (e) => {
        Logout(e);
    }
    const Logout = (e) => {
        confirm({
            title: 'Exit',
            content: 'Do you want to exit from account?',
            onOk() {
                try {
                    e.preventDefault();
                    dispatch(logout());
                    history("/");
                }
                catch (error) {
        
                }
            },
            onCancel() {
            },
          });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home | </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isAdmin ?
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/profile">Something</Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/students">AdminPanel Students</Link>
                                </li>
                            }
                            {!isAdmin ?
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/studentCourses">Courses</Link>
                                </li>

                                :
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/courses">AdminPanel Courses</Link>
                                </li>
                            }
                        </ul>
                        {!isAuth ?
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">????????</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">????????????????????</Link>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">{user.name}</Link>
                                </li>
                                <li className="nav-item">
                                    <label className="nav-link" onClick={onClickLogout}>??????????</label>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
