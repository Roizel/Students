import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        email: Yup.string()
            .email('Email is incorrect')
            .required("The Email field is required!"),

        password: Yup.string()
            .required('The Password field is required!')
            .min(5, 'The Password field must be at least 5 characters long!'),
    });
}
export default validationFields;


