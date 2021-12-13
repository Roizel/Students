import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CourseAll, SignUpCourse } from '../../components/actions/course';

const StudentCourse = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.courses);
    const { user } = useSelector(redux => redux.auth)

    useEffect(() => {
        try
        {
            dispatch(CourseAll())
            .then()
            .catch()
        }
        catch (error) {
            console.log("Server error global");
        }
    }, [])

    const onSignupClick = (id) => {
        try 
        {
             console.log(user.email)
            //  dispatch(SignUpCourse(id))
            //  .then()
            //  .catch();
        } 
        catch (error) 
        {

        }
    }
    return (
        <div className="row">
            <h3 className="mt-4 mb-4">Курси</h3>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">StartCourse</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((course, index) => {
                            return (
                                <tr key={index}>
                                    <td>{course.id}</td>
                                    <td>{course.name}</td>
                                    <td><p className="text-break">{course.description}</p></td>
                                    <td>{course.duration}</td>
                                    <td>{course.startcourse}</td>
                                    <td>
                                        <img src={"https://localhost:44315" + course.photo} alt="Самогон" width="150" />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => onSignupClick(course.id)} className="btn btn-light">Записатись</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StudentCourse;