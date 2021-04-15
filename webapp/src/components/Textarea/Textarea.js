import { Field } from 'formik';
import React from 'react'
import "./Textarea.scss";

const Textarea = ({ form, active, label, error, errorMsg, ...rest }) => {
  return (
    <div className={`textarea ${error && 'borderError'}`}>
      <label className={`${active && 'active'} ${error && "error"}`}>{errorMsg ? errorMsg : label}</label>
      {form
      ? <Field as="textarea" {...rest} />
      : <textarea {...rest} />}
    </div>

  )
}

export default Textarea;
