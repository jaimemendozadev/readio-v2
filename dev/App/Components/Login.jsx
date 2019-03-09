import React from 'react';
const localhost = 'http://localhost:3000';
const API_PATH = '/api/login';
const baseURL =
  process.env.NODE_ENV === 'development'
    ? `${localhost}${API_PATH}`
    : `${API_PATH}`;

const Login = ({heading}) => {
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
