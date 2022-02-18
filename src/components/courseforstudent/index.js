import { GET_STUDENT_COURSE, COURSE_ALL } from "../../constants/actionTypes";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classnames from "classnames";
import { Subscribe, GetStudentCourse, UnSubscribe } from '../../components/actions/course';
import { CourseAll, PaggingCourses, PaggingCoursesWithSubs } from '../actions/pagination';
import EclipseWidget from '../common/eclipse/index';
import 'antd/dist/antd.css';
import { Pagination, Table, Tag, Space, Input } from 'antd';


const StudentCourse = () => {
    const dispatch = useDispatch();
    const { listOfCourses } = useSelector(state => state.pagination);
    const { user, isAuth } = useSelector(redux => redux.auth);

    const [subs, setSubs] = useState([]);

    const [typeOfSort, setTypeOfSort] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [columnSort, setColumnSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState("");

    const { Search } = Input;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const formData = new FormData();
            if(user.name != undefined)
            {
                formData.append('Name', user.name);
            }
            dispatch(PaggingCoursesWithSubs(formData))
            .then(res => {
                dispatch({type: GET_STUDENT_COURSE, payload: res.subscriptions});
                setSubs(res.subscriptions);
                setTotalPages(res.total);
                setLoading(false);
            })
            .catch(res => { console.log(res); setLoading(false)})
        }
        catch (error) { console.log("Server error global", error ); }
    }, [])

    const columnsForUnrgUser = [
        { title: 'Id',           dataIndex: 'id',          key: 'id', sorter: true},
        { title: 'Name',         dataIndex: 'name',        key: 'name', sorter: true,        render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description', key: 'description',  render: text => <a>{text}</a>, },
        { title: 'Duration',     dataIndex: 'duration',    key: 'duration'},
        { title: 'StartCourse',  dataIndex: 'startCourse', key: 'startCourse', },
        { title: 'Photo',        dataIndex: 'photo',       key: 'photo',        render: text => <img src={"https://localhost:44315" + text} alt="Самогон" width="100" />, },
    ]

    const columnsForRegistUser = [
        { title: 'Id',           dataIndex: 'id',           key: 'id', sorter: true},
        { title: 'Name',         dataIndex: 'name',         key: 'name', sorter: true,        render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description',  key: 'description',  render: text => <a>{text}</a>,},
        { title: 'Duration',     dataIndex: 'duration',     key: 'duration', sorter: true},
        { title: 'Photo',        dataIndex: 'photo',        key: 'photo',        render: text => <img src={"https://localhost:44315"+text} alt="Самогон" width="100" />, },
        { title: 'Subscribe',    dataIndex: '',             key: 'subscribe',    render: id  => <button type="button" onClick={() => onSubscribeClick(id.id, user.name)} className={classnames("btn", 
                                                                                                                                                                                  {"btn btn-dark": CheckSubscibe(id.id) == false}, 
                                                                                                                                                                                  {disabled: CheckSubscibe(id.id) == true})}
                                                                                                                                                                                  >Subscribe
                                                                                                                                                                                  </button>,},                                                       
        { title: 'Unsubscribe',  dataIndex: '',             key: 'unSubscribe',  render: id => <button type="button" onClick={() => onUnSubscribeClick(id.id, user.name)} className={classnames("btn", 
                                                                                                                                                                                  {disabled: CheckSubscibe(id.id) == false}, 
                                                                                                                                                                                  {"btn btn-danger": CheckSubscibe(id.id) == true})}
                                                                                                                                                                                  >Unsubscribe
                                                                                                                                                                                  </button>,}, 
    ]

    const GetData = (text) => {

        setSearchText(text);
        const formData = new FormData();
        formData.append('SearchWord', text);
        formData.append('Sort', columnSort);
        formData.append('TypeOfSort', typeOfSort);
        formData.append('PageSize', pageSize);

        
        dispatch(PaggingCoursesWithSubs(formData))
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

        dispatch(PaggingCoursesWithSubs(formData))
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

        dispatch(PaggingCoursesWithSubs(formData))
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

    const onSubscribeClick = (id, name) => {
        try {
            const formData = new FormData();
            formData.append("CourseId", id);
            formData.append("Name", name);
            dispatch(Subscribe(formData))
                .then(res => { setLoading(false) })
                .catch(res => { setLoading(false) });
        }
        catch (error) {

        }
    }

    const onUnSubscribeClick = (id, name) => {
        try {
            const formData = new FormData();
            formData.append("CourseId", id);
            formData.append("Name", name);
            dispatch(UnSubscribe(formData))
                .then(res => { setLoading(false) })
                .catch(res => { setLoading(false) });
        }
        catch (error) {

        }
    }
    const CheckSubscibe = (id) => {
        let courseId = [];
        let IsSubs;
        subs.map((course) => {
            courseId.push(course.courseId);
        })

        let check = courseId.find(ex => ex === id);
        if (check == id) {
            IsSubs = true;
        }
        else {
            IsSubs = false;
        }
        return IsSubs
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
            {!isAuth ?
                <Table
                    pagination={false}
                    columns={columnsForUnrgUser}
                    dataSource={listOfCourses}
                    onChange={Sort}
                />
                :
                <Table
                    pagination={false}
                    columns={columnsForRegistUser}
                    dataSource={listOfCourses}
                    onChange={Sort}
                />
            }
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

export default StudentCourse;