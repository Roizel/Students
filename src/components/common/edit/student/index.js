import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StudentsAll, StudentDelete } from '../../../actions/students';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import EclipseWidget from '../../eclipse/index';

const StudentPage = () => {
    const dispatch = useDispatch();
    const {list} = useSelector(state => state.students);
    const [loading, setLoading] = useState(true);

    const columns = [
        { title: 'Id',       dataIndex: 'id',       key: 'id',},
        { title: 'Name',     dataIndex: 'name',     key: 'name',     render: text => <a>{text}</a>, },
        { title: 'Surname',  dataIndex: 'surname',  key: 'surname',  render: text => <a>{text}</a>,},
        { title: 'Email',    dataIndex: 'email',    key: 'email',},
        { title: 'Phone',    dataIndex: 'phone',    key: 'phone',},
        { title: 'Age',      dataIndex: 'age',      key: 'age',},
        { title: 'Image',    dataIndex: 'photo',    key: 'photo',    render: text => <img src={"https://localhost:44315/images/"+text} alt="Самогон" width="100" />, },
        { title: 'Delete',   dataIndex: '',         key: 'delete',   render: id => <button type="button" onClick={() => onDeleteClick(id.id)} className="btn btn-danger">Delete</button>,},
        { title: 'Edit',     dataIndex: '',         key: 'edit',     render: id => <Link className="btn btn-warning" to={`/student/edit/${id.id}`}>Edit</Link>,},
    ]

    useEffect(() => {
        try 
        {
            dispatch(StudentsAll())
            .then(res => {setLoading(false)})
            .catch(res => {setLoading(false)})
        } 
        catch (error) {
            console.log("Server error global");
        }
    }, [])
    
    const onDeleteClick = (id) => {
        try {
          dispatch(StudentDelete(id))
          .then(res => {setLoading(false)})
          .catch(res => {setLoading(false)}); 
        } catch (error) {
            
        }
    }
    return (
        <div className="row">
            {loading && <EclipseWidget/>}
            <Table columns={columns} dataSource={list} />;
        </div>
    );
}

export default StudentPage;