import React, { useRef, useState, useEffect } from 'react'
import validatonFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from '../../inputs/inputText';
import MyPhotoInput from '../../inputs/photoInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import courseService from '../../../services/courseService';
import { EditCourse } from '../../../actions/course';

const EditCoursePage = () => {
    const initState = {
        name: '',
        description: '',
        duration: '',
        startcourse: '',
        photo: null,
    };

    const formikRef = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const [imagePath, setImagePath] = useState();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const history = useNavigate();

    const dispatch = useDispatch();
    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log(values);
        dispatch(EditCourse(formData))
            .then(result => {
                history("/courses");
                console.log("Ok");
            })
            .catch(ex => {
                console.log(ex);
                const { errors } = ex;
                Object.entries(errors).forEach(([key, values]) => {
                    let message = '';
                    values.forEach(text => message += text + " ");
                    formikRef.current.setFieldError(key, message);
                });
                setInvalid(errors.invalid);
                titleRef.current.scrollIntoView({ behavior: 'smooth' })
            });
    }
    useEffect(() => {
        try {
            courseService.edit(id)
                .then(res => {
                    const { data } = res;
                    console.log(res.data);
                    formikRef.current.setFieldValue("id", id);
                    formikRef.current.setFieldValue("name", data.name);
                    formikRef.current.setFieldValue("description", data.description);
                    formikRef.current.setFieldValue("duration", data.duration);
                    formikRef.current.setFieldValue("startcourse", data.startCourse);
                    setImagePath("https://localhost:44315" + data.photo);
                })
        }
        catch (error) {
            console.log("Server error global " + error.message);
        }
    }, []);

    return (
        <div className="row">
            <h1 ref={titleRef} className="text-center">Edit Student</h1>
            {
                invalid && invalid.length > 0 &&
                <div className="alert alert-danger">
                    <ul>
                        {
                            invalid.map((text, index) => {
                                return (
                                    <li key={index}>{text}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            }
            <div className="offset-md-3 col-md-6">
                <Formik
                    enableReinitialize
                    innerRef={formikRef}
                    initialValues={initState}
                    onSubmit={onSubmitHandler}
                    validationSchema={validatonFields()}>
                    <Form>

                    <MyTextInput
                            label="Name"
                            name="name"
                            type="text"
                            id="name"
                            placeH="Write your name"
                        />

                        <MyTextInput
                            label="Description"
                            name="description"
                            type="text"
                            id="description"
                            placeH="Write description of course"
                        />

                        <MyTextInput
                            label="Duration"
                            name="duration"
                            type="text"
                            id="duration"
                            placeH="Write duration of course"
                        />

                        <MyTextInput
                            label="Startcourse"
                            name="startcourse"
                            type="text"
                            id="startcourse"
                            placeH="Write the start date of the course"
                        />

                        {imagePath &&
                            <MyPhotoInput
                                myField="photo"
                                name="photo"
                                id="photo"
                                data={imagePath}
                                formikRef={formikRef}
                            />
                        }
                        <button type="submit" className="btn btn-dark">Edit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default EditCoursePage;