import React, { useRef, useState } from 'react'
import validatonFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from '../../inputs/inputText';
import MyPhotoInput from '../../inputs/photoInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { CreateCourse } from '../../../actions/course';
const CreateCoursePage = () => {

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
    const history = useNavigate();

    const dispatch = useDispatch();
    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log("Нажалось");
        dispatch(CreateCourse(formData))
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
    return (
        <div className="row">
          
          <h1 ref={titleRef} className="text-center">Create Course</h1>
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
                                                
                        <MyPhotoInput
                            myField="photo"
                            name="photo"
                            id="photo"
                            formikRef={formikRef}
                        />
                        
                        <button type="submit" className="btn btn-dark">Create New Course</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default CreateCoursePage;