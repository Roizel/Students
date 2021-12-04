import React, { useRef, useState } from 'react'
import validatonFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from "../../common/inputs/inputText";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../actions/auth';

const LoginPage = () => { /*Тут буде наш стейт*/

    const initState = {
        email: '',
        password: '',
    };
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const history = useNavigate();
    const onSubmitHandler=(values) =>
    {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log(formData);
        dispatch(LoginUser(formData))
           .then(result => {
               history("/");
           })
           .catch(ex => {
               console.log(ex);
               setInvalid(ex.errors);
           })
    };
    return (
        <div className="row">
            <h1 className="text-center">Вхід</h1>
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
                </Form>
            </Formik>
            </div>
        </div>
    )
}

export default LoginPage