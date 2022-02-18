import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CourseDelete, CreateCourse } from '../../actions/course';
import { CourseAll, PaggingCourses } from '../../actions/pagination';
import { Pagination, Table, Tag, Space, Input } from 'antd';
import 'antd/dist/antd.css';
import EclipseWidget from '../eclipse/index';

const CoursePage = () => {
    const dispatch = useDispatch();
    const { listOfCourses } = useSelector(state => state.pagination);
    const [loading, setLoading] = useState(true);

    const [typeOfSort, setTypeOfSort] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [columnSort, setColumnSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState("");

    const { Search } = Input;

    const columns = [
        { title: 'Id',           dataIndex: 'id',           key: 'id', sorter: true},
        { title: 'Name',         dataIndex: 'name',         key: 'name', sorter: true, render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description',  key: 'description',  render: text => <a>{text}</a>,},
        { title: 'Duration',     dataIndex: 'duration',     key: 'duration'},
        { title: 'Photo',        dataIndex: 'photo',        key: 'photo',    render: text => <img src={"https://localhost:44315"+text} alt="Самогон" width="100" />, },
        { title: 'Delete',       dataIndex: '',             key: 'delete',   render: id => <button type="button" onClick={() => onDeleteClick(id.id)} className="btn btn-danger">Delete</button>,},
        { title: 'Edit',         dataIndex: '',             key: 'edit',   render: id => <Link className="btn btn-warning" to={`/course/edit/${id.id}`}>Edit</Link>,},
    ]

    const GetData = (text) => {

        setSearchText(text);
        const formData = new FormData();
        formData.append('SearchWord', text);
        formData.append('Sort', columnSort);
        formData.append('TypeOfSort', typeOfSort);
        formData.append('PageSize', pageSize);

        
        dispatch(PaggingCourses(formData))
            .then(res => {
                setTotalPages(res.total);
                setLoading(false);

            })
            .catch(res => {
                setLoading(false);
                console.log(res);
            })
    }

    const Pag = (page, pageSize) => {

        const formData = new FormData();
        formData.append('SearchWord', searchText);
        formData.append('Sort', columnSort);
        formData.append('Page', page);
        formData.append('TypeOfSort', typeOfSort);
        formData.append('PageSize', pageSize);

        dispatch(PaggingCourses(formData))
            .then(res => {
                setPage(page);
                setTotalPages(res.total);
                setLoading(false);

            })
            .catch(res => {
                setLoading(false);
                console.log(res);
            })
    }

    const Sort = (pagination, filters, sorter) => {

        const nameOfField = sorter.field;
        const typeOfSorting = sorter.order;

        const formData = new FormData();
        formData.append('SearchWord', searchText);
        formData.append('Sort', nameOfField);
        formData.append('Page', page);
        formData.append('TypeOfSort', typeOfSorting);
        formData.append('PageSize', pageSize);

        dispatch(PaggingCourses(formData))
            .then(res => {
                setTotalPages(res.total);
                setColumnSort(nameOfField);
                setTypeOfSort(typeOfSorting);
                setLoading(false);

            })
            .catch(res => {
                setLoading(false);
                console.log(res);
            })

        console.log(sorter);
    }

    useEffect(() => {
        try {
            dispatch(PaggingCourses())
                .then(res => {
                    console.log(res);
                    setTotalPages(res.total);
                    setLoading(false);

                })
                .catch(res => { setLoading(false) })
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

    return (
        <div className="row">
        {loading && <EclipseWidget />}
        <Link className="btn btn-dark mt-4 mb-4" to={`/createCourse`}>Add Course</Link>
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(text) => GetData(text)}
        />
        <Table 
            pagination={false}
            columns={columns} 
            dataSource={listOfCourses} 
            onChange={Sort} 
            />
        <Pagination 
            defaultCurrent={1} 
            total={totalPages}
            showSizeChanger
            showTotal={total => `Total ${totalPages} items`}
            onChange={(page, pageSize) => Pag(page, pageSize)} 
        />
    </div>
    );
}

export default CoursePage;