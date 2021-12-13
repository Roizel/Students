import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CourseAll, CourseDelete, CreateCourse } from '../../actions/course';

const CoursePage = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.courses);

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

    const onDeleteClick = (id) => {
        try 
        {
            dispatch(CourseDelete(id))
            .then()
            .catch();
        } 
        catch (error) 
        {

        }
    }
    return (
        <div className="row">
            <Link className="btn btn-dark mt-4 mb-4" to={`/createCourse`}>Add Course</Link>
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
                                        <button type="button" onClick={() => onDeleteClick(course.id)} className="btn btn-danger">Delete</button>
                                        <Link className="btn btn-dark" to={`/course/edit/${course.id}`}>Edit</Link>
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

export default CoursePage;