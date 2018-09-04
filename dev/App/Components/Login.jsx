import React from "react";
const baseURL = "https://readio.herokuapp.com/api/login";

const Login = ({ heading }) => {
  return (
    <div className="form-container">
      <form>
        <h1>{heading}</h1>
        {/* <a href={`${baseURL}/facebook`} className="facebook">
          Continue with Facebook
        </a> */}
        <a href={`${baseURL}/google`} className="google">
          Continue with Google
        </a>
      </form>
    </div>
  );
};

export default Login;
