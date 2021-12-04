import { useField } from 'formik';
import classNames from 'classnames';

const MyTextInput = ({ label, placeH, ...props }) => {

    const [field, meta] = useField(props);
    return (

      <div className="mb-3">
        <label htmlFor={props.id || props.name} className="form-label">{label}</label>
        <input className={classNames("form-control",
                        {"is-invalid": meta.error && meta.touched},
                        {"is-valid": !meta.error && meta.touched})} 
                        {...field} {...props} placeholder ={placeH} />
        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
      </div>

    );
  };

  export default MyTextInput;