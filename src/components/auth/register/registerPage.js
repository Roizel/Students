import React, { useRef, useState } from 'react'
import validationFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from "../../common/inputs/inputText";
import MyPhotoInput from '../../common/inputs/photoInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { RegisterUser, authFacebook } from '../../actions/auth';
import { message } from 'antd';

const RegisterPage = () => {

    const initState = {
        name: '',
        surname: '',
        email: '',
        age: '',
        photo: null,
        phone: '',
        password: '',
        confirmPassword: ''
    };

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');

    const formikRef = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const history = useNavigate();

    const responseFacebook = (response) => {
        if (response.accessToken) {
            history(`/registerFb/${response.accessToken}`);
        }
        else {
            message.error("User with this token doesn`t exist");
        }
    }

    const dispatch = useDispatch();
    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(RegisterUser(formData))
            .then(result => {
                message.warning("Confirm your account. Link was send to your email");
                history("/studentCourses");
            })
            .catch(ex => {
                const { errors } = ex;
                if (errors !== undefined || errors !== undefined) {
                    Object.entries(errors).forEach(([key, values]) => {
                        let message = '';
                        values.forEach(text => message += text + " ");
                        formikRef.current.setFieldError(key, message);
                    });
                    setInvalid(errors.invalid);
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                }
            });
    }

    return (
        <div className="row">
            <h1 ref={titleRef} className="text-center">Registration</h1>
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
                    validationSchema={validationFields()}>
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
                            label="?????????????????? ??????????"
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

                        <MyPhotoInput
                            myField="photo"
                            name="photo"
                            id="photo"
                            formikRef={formikRef}
                        />

                        <MyTextInput
                            label="????????????"
                            name="password"
                            type="password"
                            id="password"
                            placeH="Write your password"
                        />

                        <MyTextInput
                            label="?????????????????? ????????????"
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            placeH="Confirm password"
                        />
                        <button type="submit" className="btn btn-dark">????????????????????</button>


                    </Form>
                </Formik>
                {!login &&
                    <FacebookLogin
                        appId="621571515727147"
                        autoLoad={false}
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        cssClass="loginBtn loginBtn--facebook"
                    />
                }
            </div>
        </div>
    )
}

export default RegisterPage;