import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        email: Yup.string()
            .email('Email is incorrect')
            .required("The Email field is required!"),

        phone: Yup.string()
            .required('The Phone field is required!')
            .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'Phone must been like: 38 (000)-000-00-00'),

        name: Yup.string()
            .required("The Name field is required!")
            .min(3, 'Name must contain minimum 3 symbols.'),

        surname: Yup.string()
            .required("The Surname field is required!")
            .min(3, 'Surname must contain minimum 3 symbols.'),

        age: Yup.number()
            .typeError('Age must be a number')
            .positive('Age must be greater than zero')
            .required('Age is required'),

        password: Yup.string()
            .required('The Password field is required!')
            .min(5, 'The Password field must be at least 5 characters long!'),
            //.matches(/[a-zA-Z]/, 'Пароль має містить латинські символи.'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
            .required("The Password field is required!"),

        photo: Yup.mixed()
            .required('Add Photo')
    });
}
export default validationFields;


