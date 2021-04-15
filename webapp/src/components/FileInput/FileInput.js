import React from 'react';
import "./FileInput.scss";

const FileInput = ({ error, text, formBtn, ...rest }) => {
  return (
    <label className={`fileInput ${formBtn && "formBtn"} ${error && 'borderError'}`}>
      <input type="file" {...rest} />
      <small className={`${error && "error"}`}>{text}</small>
    </label>
  );
};

export default FileInput;
