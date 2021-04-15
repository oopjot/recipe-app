import React from "react";
import "./Button.scss";

const Button = ({ type = "button", error, text, primary, soft, deleteBtn, active, formBtn, ...rest }) => {
  return (
    <button
      {...rest}
      type={type}
      className={`btn ${primary ? "primary" : "secondary"} ${soft && 'soft'} ${active && "active"} ${deleteBtn && "deleteBtn"} ${formBtn && "formBtn"} ${error && 'btnError'}`}
    >
      {text}
    </button>
  );
};

export default Button;
