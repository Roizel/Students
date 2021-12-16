import React, { useRef, useState } from 'react'
import validatonFields from './validation';
import { Formik, Form } from 'formik';
import MyTextInput from "../../common/inputs/inputText";
import MyPhotoInput from '../../common/inputs/photoInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../actions/auth';

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

    const formikRef = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const history = useNavigate();

    const dispatch = useDispatch();
    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log("Нажалось");
        dispatch(RegisterUser(formData))
            .then(result => {
                history("/studentCourses");
                console.log("Ok");
            })
            .catch(ex => {
                const { errors } = ex;
                if(errors !== undefined || errors !== undefined)
                {
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
                                                
                        <MyPhotoInput
                            myField="photo"
                            name="photo"
                            id="photo"
                            formikRef={formikRef}
                        />
                        
                         <MyTextInput
                            label="Пароль"
                            name="password"
                            type="password"
                            id="password"
                            placeH="Write your password"
                        />

                        <MyTextInput
                            label="Повторіть пароль"
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            placeH="Confirm password"
                        />
                        <button type="submit" className="btn btn-dark">Реєстрація</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default RegisterPage;