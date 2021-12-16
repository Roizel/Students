import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CourseAll, CourseDelete, CreateCourse } from '../../actions/course';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import EclipseWidget from '../eclipse/index';

const CoursePage = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.courses);
    const [loading, setLoading] = useState(true);

    const columns = [
        { title: 'Id',           dataIndex: 'id',           key: 'id',},
        { title: 'Name',         dataIndex: 'name',         key: 'name',     render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description',  key: 'description',  render: text => <a>{text}</a>,},
        { title: 'Duration',     dataIndex: 'duration',     key: 'duration',},
        { title: 'Photo',        dataIndex: 'photo',        key: 'photo',    render: text => <img src={"https://localhost:44315"+text} alt="Самогон" width="100" />, },
        { title: 'Delete',       dataIndex: '',             key: 'delete',   render: id => <button type="button" onClick={() => onDeleteClick(id.id)} className="btn btn-danger">Delete</button>,},
        { title: 'Edit',         dataIndex: '',             key: 'edit',   render: id => <Link className="btn btn-warning" to={`/student/edit/${id.id}`}>Edit</Link>,},
    ]

    useEffect(() => {
        try
        {
            dispatch(CourseAll())
            .then(res => {setLoading(false)})
            .catch(res => {setLoading(false)})
        }
        catch (error) {
            console.log("Server error global");
        }
    }, [])

    const onDeleteClick = (id) => {
        try 
        {
            dispatch(CourseDelete(id))
            .then(res => {setLoading(false)})
            .catch(res => {setLoading(false)});
        } 
        catch (error) 
        {

        }
    }
    console.log(list)
    return (
        <div className="row">
            {loading && <EclipseWidget/>}
            <Link className="btn btn-dark mt-4 mb-4" to={`/createCourse`}>Add Course</Link>
            <Table columns={columns} dataSource={list} />
        </div>
    );
}

export default CoursePage;