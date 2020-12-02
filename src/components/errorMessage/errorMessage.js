import React from "react";
import logo from "./error.jpg";
import "./errorMessage.css";

const ErrorMessage = () => {
  return (
    <div className="errorBlock">
      <img src={logo} alt="error-image" />
      <span className="errMsg">Something goes wrong</span>
    </div>
  );
};

export default ErrorMessage;
