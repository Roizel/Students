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

    useEffect(() => {
        try {
            dispatch(CourseAll())
                .then(res => { setLoading(false) })
                .catch(res => { setLoading(false) })

            if (user.name != null) {
                    dispatch(GetStudentCourse(user.name))
                        .then(result => {
                            dispatch({ type: GET_STUDENT_COURSE, payload: result });
                        })
                        .catch(res => { setLoading(false) })
                }
        }
        catch (error) { console.log("Server error global"); }
        setLoading(false);
    }, [])

    const columnsForUnrgUser = [
        { title: 'Id',           dataIndex: 'id',          key: 'id', },
        { title: 'Name',         dataIndex: 'name',        key: 'name',         render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description', key: 'description',  render: text => <a>{text}</a>, },
        { title: 'Duration',     dataIndex: 'duration',    key: 'duration', },
        { title: 'StartCourse',  dataIndex: 'startCourse', key: 'startCourse', },
        { title: 'Photo',        dataIndex: 'photo',       key: 'photo',        render: text => <img src={"https://localhost:44315" + text} alt="Самогон" width="100" />, },
    ]

    const columnsForRegistUser = [
        { title: 'Id',           dataIndex: 'id',           key: 'id',},
        { title: 'Name',         dataIndex: 'name',         key: 'name',         render: text => <a>{text}</a>, },
        { title: 'Description',  dataIndex: 'description',  key: 'description',  render: text => <a>{text}</a>,},
        { title: 'Duration',     dataIndex: 'duration',     key: 'duration',},
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
        const {data} = courseStudent;
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