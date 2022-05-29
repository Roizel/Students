import React, { useRef, useState } from 'react'
import validatonFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from "../../common/inputs/inputText";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../actions/auth';
import { LoginFacebook } from '../../actions/auth';
import FacebookLogin from 'react-facebook-login';
import { message } from 'antd';
import "antd/dist/antd.css";

const LoginPage = () => {

    const initState = {
        email: '',
        password: '',
    };

    const formikRef = useRef();
    const titleRef = useRef();
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const history = useNavigate();

    const responseFacebook = (response) => {
        if (response.accessToken)
        {
            const formData = new FormData();
            formData.append('facebookToken', response.accessToken);
            dispatch(LoginFacebook(formData))
                .then(result => {
                   history("/");
                   message.success("Login successfully");
                })
                .catch(result => {
                    console.log(result.response.status);
                    if (result.response.status === 409) {
                        message.error("This email already exist");
                        history("/");
                    }
                    if (result.response.status === 404) {
                        message.error("Something went worng :(");
                    }
                    if (result.response.status === 400) {
                        message.error("Something went worng :(");
                    }
                });
        }
    }

    const onSubmitHandler=(values) =>
    {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log(formData);
        dispatch(LoginUser(formData))
           .then(result => {
               history("/");
               message.success("Login successfully");
           })
           .catch(ex => {
            message.info("Login error");
            const { errors } = ex;
            Object.entries(errors).forEach(([key, values]) => {
                let message = '';
                values.forEach(text => message += text + " ");
                formikRef.current.setFieldError(key, message);
            });
            setInvalid(errors.invalid);
            titleRef.current.scrollIntoView({ behavior: 'smooth' })
           })
    };
    return (
        <div className="row">
            <h1 ref={titleRef} className="text-center">Login</h1>
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
                initialValues = {initState} 
                onSubmit={onSubmitHandler}
                validationSchema= {validatonFields()}>
                <Form>

                    <MyTextInput
                        label = "Електрона пошта"
                        name = "email"
                        type = "Email"
                        id= "email"
                    />

                    <MyTextInput
                        label = "Пароль"
                        name = "password"
                        type = "password"
                        id= "password"
                    />

                    <button type="submit" className="btn btn-dark">Увійти</button>
                    <FacebookLogin
                        appId="621571515727147"
                        autoLoad={false}
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        cssClass="loginBtn loginBtn--facebook"
                    />

                </Form>
            </Formik>
            </div>
        </div>
    )
}

export default LoginPage