import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        name: Yup.string()
            .required("The Name field is required!"),

        description: Yup.string()
            .required("The Description field is required!")
            .min(20, 'Description must contain minimum 20 symbols.'),

        duration: Yup.string()
            .required("The Duration field is required!")
            .min(3, 'Duration must contain minimum 3 symbols.'),

        startcourse: Yup.string()
            .required('The date of the course field is required!'),

        photo: Yup.mixed()
            .required('Add Photo')
    });
}
export default validationFields;


