import React, { useRef, useState, useEffect } from 'react'
import validatonFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from '../../inputs/inputText';
import MyPhotoInput from '../../inputs/photoInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { StudentEditSave } from '../../../actions/students';
import { useParams } from "react-router-dom";
import studentsService from '../../../services/studentsService';

const EditStudentPage = () => {
    const initState = {
        name: '',
        surname: '',
        email: '',
        age: '',
        photo: null,
        phone: '',
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
        dispatch(StudentEditSave(formData))
            .then(result => {
                history("/");
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
            studentsService.edit(id)
                .then(res => {
                    const { data } = res;
                    console.log(res.data);
                    formikRef.current.setFieldValue("id", id);
                    formikRef.current.setFieldValue("name", data.name);
                    formikRef.current.setFieldValue("surname", data.surname);
                    formikRef.current.setFieldValue("email", data.email);
                    formikRef.current.setFieldValue("phone", data.phone);
                    formikRef.current.setFieldValue("age", data.age);
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
                            label="Surname"
                            name="surname"
                            type="text"
                            id="surname"
                            placeH="Write your surname"
                        />

                        <MyTextInput
                            label="Електрона пошта"
                            name="email"
                            type="Email"
                            id="email"
                            placeH="Write your Email"
                        />

                        <MyTextInput
                            label="Phone"
                            name="phone"
                            type="text"
                            id="phone"
                            placeH="Write your phone"
                        />

                        <MyTextInput
                            label="Age"
                            name="age"
                            type="text"
                            id="age"
                            placeH="Write your age"
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

export default EditStudentPage;