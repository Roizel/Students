import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StudentsAll, StudentDelete } from '../../../actions/students';

const StudentPage = () => {
    const dispatch = useDispatch();
    const {list} = useSelector(state => state.students);

    useEffect(() => {
        try 
        {
            dispatch(StudentsAll())
            .then()
            .catch()
        } 
        catch (error) {
            console.log("Server error global");
        }
    }, [])
    
    const onDeleteClick = (id) => {
        try {
          dispatch(StudentDelete(id))
          .then()
          .catch(); 
        } catch (error) {
            
        }
    }
    return (
        <div className="row">
            <h3 className="text-center">Edit Students</h3>
            <table className="table table-dark table-borderless">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.surname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <img src={"https://localhost:44315/images/"+student.photo+"?t="+new Date().getTime()} alt="Самогон" width="150" />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => onDeleteClick(student.id)} className="btn btn-danger">Delete</button>
                                        <Link className="btn btn-dark" to={`/student/edit/${student.id}`}>Edit</Link>
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

export default StudentPage;