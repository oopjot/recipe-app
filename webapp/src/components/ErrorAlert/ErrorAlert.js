import React from 'react'
import "./ErrorAlert.scss"

const ErrorAlert = ({ text }) => {
  return (
    <div className="errorAlert">
      <p>{text}</p>      
    </div>
  )
}

export default ErrorAlert
