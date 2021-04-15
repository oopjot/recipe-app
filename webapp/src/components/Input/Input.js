import { Field } from "formik";
import React from "react";
import "./Input.scss";

const Input = ({ type = "text", label, utility, name, active, error, errorMsg, ...rest }) => {

  return (
    <div className={`input ${utility === 'filter' && 'inputFilter'} ${utility === "ingredientForm" && "ingredientForm"} ${error && 'borderError'}`}>
      <label className={`${active && "active"} ${error && "error"}`}>{errorMsg ? errorMsg : label}</label>
      {utility === "form" || utility === "ingredientForm" ? (
        <Field type={type} name={name} {...rest} />
      ) : utility === "filter" ? (
        <input type={type} {...rest} />
      ) : utility
      }
    </div>
  );
};

export default Input;
