import { GET_STUDENT_COURSE } from "../../constants/actionTypes";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classnames from "classnames";
import { CourseAll, Subscribe, GetStudentCourse, UnSubscribe } from '../../components/actions/course';
import EclipseWidget from '../common/eclipse/index';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';


const StudentCourse = () => {
    const dispatch = useDispatch();
    const { list, courseStudent } = useSelector(state => state.courses);
    const { user, isAuth } = useSelector(redux => redux.auth);
    const [loading, setLoading] = useState(true);
    let ymry2 = null;

    const columnsForUnrgUser = [
        { title: 'Id',           dataIndex: 'id',          key: 'id', },
        { title: 'Name',         dataIndex: 'name',        key: 'name',         render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description', key: 'description',  render: text => <a>{text}</a>, },
        { title: 'Duration',     dataIndex: 'duration',    key: 'duration', },
        { title: 'StartCourse',  dataIndex: 'startCourse', key: 'startCourse', },
        { title: 'Photo',        dataIndex: 'photo',       key: 'photo',        render: text => <img src={"https://localhost:44315" + text} alt="Самогон" width="100" />, },
    ]

    const columnsForRegistUser = [
        {ymry: CheckSubscibe(text => text.id)},
        { title: 'Id',           dataIndex: 'id',           key: 'id',},
        { title: 'Name',         dataIndex: 'name',         key: 'name',         render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description',  key: 'description',  render: text => <a>{text}</a>,},
        { title: 'Duration',     dataIndex: 'duration',     key: 'duration',},
        { title: 'Photo',        dataIndex: 'photo',        key: 'photo',        render: text => <img src={"https://localhost:44315"+text} alt="Самогон" width="100" />, },
        { title: 'Subscribe',    dataIndex: '',             key: 'subscribe',    render: id  => <button type="button" onClick={() => onSubscribeClick(id.id, user.name)} className={classnames("btn", 
                                                                                                                                                                                  {"btn btn-dark": ymry == true}, 
                                                                                                                                                                                  {disabled: ymry == false})}
                                                                                                                                                                                  >Subscribe
                                                                                                                                                                                  </button>,},                                                       
        { title: 'Unsubscribe',  dataIndex: '',             key: 'unSubscribe',  render: id => <button type="button" onClick={() => onUnSubscribeClick(id.id, user.name)} className="btn btn-danger">Unsubscribe</button>,}, 
    ]


    useEffect(() => {
        try {
            dispatch(CourseAll())
                .then(res => { setLoading(false) })
                .catch(res => { setLoading(false) })
        }
        catch (error) { console.log("Server error global"); }

        try {
            if (user.name != null) {
                dispatch(GetStudentCourse(user.name))
                    .then(result => {
                        dispatch({ type: GET_STUDENT_COURSE, payload: result });
                    })
                    .catch(res => { setLoading(false) })
            }
        }
        catch (error) {
            console.log("Server error global");
        }
        setLoading(false);
    }, [])
    const CheckSubscibe = (id) => {
        let courseId = [];
        let IsSubs;
        const { data } = courseStudent
        data.map((course) => {
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
    return (
        <div className="row">
            <h3 className="mt-4 mb-4">Курси</h3>
            {!isAuth ?
                <Table columns={columnsForUnrgUser} dataSource={list} />
                :
                <Table columns={columnsForRegistUser} dataSource={list} />
            }
            {loading && <EclipseWidget />}
        </div>
    );
}

export default StudentCourse;






































{/* <table className="table table-dark table-hover">
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

                            let loh = CheckSubscibe(course.id)
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
                                    {!isAuth ?
                                        null
                                        :
                                        <td>
                                            {
                                                loh == false ?
                                                    <button type="button" onClick={() => onSubscribeClick(course.id, user.name)} className="btn btn-light">Записатись</button>
                                                    :
                                                    <button type="button" onClick={() => onDeleteClick(course.id, user.name)} className="btn btn-danger">Відписатись</button>
                                            }
                                        </td>
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table> */}