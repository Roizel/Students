import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StudentDelete } from '../../../actions/students';
import { GetStudentsCourses } from '../../../actions/course';
import { PaggingStudents } from '../../../actions/pagination';
import 'antd/dist/antd.css';
import { Pagination, Table, Tag, Space, Input } from 'antd';
import EclipseWidget from '../../eclipse/index';

const StudentPage = () => {
    const dispatch = useDispatch();
    const { Search } = Input;

    const [typeOfSort, setTypeOfSort] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [columnSort, setColumnSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState("");

    const [studentsCourses, setStudentsCourses] = useState([]);

    const { listOfUsers } = useSelector(state => state.pagination);
    const [loading, setLoading] = useState(true);

    const GetData = (text) => {

        setSearchText(text);
        const formData = new FormData();
        formData.append('SearchWord', text);
        formData.append('Sort', columnSort);
        formData.append('TypeOfSort', typeOfSort);
        formData.append('PageSize', pageSize);

        dispatch(PaggingStudents(formData))
            .then(res => {
                setTotalPages(res.result.total);
                setLoading(false);

            })
            .catch(res => {
                setLoading(false);
            })
    }

    const Pag = (page, pageSize) => {

        const formData = new FormData();
        formData.append('SearchWord', searchText);
        formData.append('Sort', columnSort);
        formData.append('Page', page);
        formData.append('TypeOfSort', typeOfSort);
        formData.append('PageSize', pageSize);

        setPageSize(pageSize);
        dispatch(PaggingStudents(formData))
            .then(res => {
                setPage(page);
                setTotalPages(res.result.total);
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

        dispatch(PaggingStudents(formData))
            .then(res => {
                setTotalPages(res.result.total);
                setColumnSort(nameOfField);
                setTypeOfSort(typeOfSorting);
                setLoading(false);

            })
            .catch(res => {
                setLoading(false);
                console.log(res);
            })

    }
    const columns = [
        { title: 'Id', dataIndex: 'id', key: 'id', sorter: true },
        { title: 'Name', dataIndex: 'name', key: 'name', render: text => <a>{text}</a>, sorter: true },
        { title: 'Surname', dataIndex: 'surname', key: 'surname', render: text => <a>{text}</a>, },
        { title: 'Email', dataIndex: 'email', key: 'email', },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', },
        { title: 'Age', dataIndex: 'age', key: 'age', sorter: true },
        { title: 'Image', dataIndex: 'photo', key: 'photo', render: text => <img src={"https://localhost:44315/images/" + text} alt="Самогон" width="100" />, },
        { title: 'Delete', dataIndex: '', key: 'delete', render: id => <button type="button" onClick={() => onDeleteClick(id.id)} className="btn btn-danger">Delete</button>, },
        { title: 'Edit', dataIndex: '', key: 'edit', render: id => <Link className="btn btn-warning" to={`/student/edit/${id.id}`}>Edit</Link>, },
    ]

    useEffect(() => {
        try {
            dispatch(PaggingStudents())
                .then(res => {
                    console.log(res);
                    setTotalPages(res.result.total);
                    setLoading(false);

                })
                .catch(res => { setLoading(false) })

            dispatch(GetStudentsCourses())
                .then(res => {
                    console.log(res);
                    setStudentsCourses(res);
                    setLoading(false);

                })
                .catch(res => { setLoading(false) })
        }
        catch (error) {
            console.log("Server error global");
        }
    }, [])

    const onDeleteClick = (id) => {
        try {
            dispatch(StudentDelete(id))
                .then(res => { setLoading(false) })
                .catch(res => { setLoading(false) });
        } catch (error) {

        }
    }

    const ShowStudentSubscribes = (record) => {
        let course = '';
        for (let index = 0; index < studentsCourses.length; index++) {
            if(record.id == studentsCourses[index].id)
            {
                course += `${studentsCourses[index].name} \n`;
            }
        }
        return course;
    }

    const IsStudentsHasSubscribes = (record) => {
        let id = 0
        for (let index = 0; index < studentsCourses.length; index++) {
            if(record.id == studentsCourses[index].id)
            {
                id = studentsCourses[index].id
            }
        }
        return id;
    }

    return (
        <div className="row">
            {loading && <EclipseWidget />}
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
                dataSource={listOfUsers}
                onChange={Sort}
                rowKey={(record) => { return record.id }}
                expandable={{
                    expandedRowRender: (record) => 
                    (
                         <div style={{ whiteSpace: 'pre-line' }}>{ShowStudentSubscribes(record)}</div>
                    ),
                    rowExpandable: (record) => record.id == IsStudentsHasSubscribes(record),
                }}
            />
          <Pagination 
            defaultCurrent={1} 
            total={totalPages}
            showSizeChanger
            showTotal={total => `Total ${totalPages} items`}
            onChange={(page, pageSize) => Pag(page, pageSize)} 
        />
        </div>
    )
}

export default StudentPage;