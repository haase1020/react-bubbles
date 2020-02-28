import React, { useState } from "react";
import axios from 'axios';
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState({
    username:'',
    password: ''
  });

  const handleChange = event => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
    .post('login', login)
    .then(response => {
      console.log('login reponse', response);
      localStorage.setItem('token', response.data.payload);
      props.hisotry.push('/bubble-page');
    })
    .catch(error => {
      console.log(`login error: ${error}`);
    });
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
          type='text'
          name='username'
          value={login.username}
          onChange={handleChange}
          className='input'
          />
        </label>
        <label>
          Password:
          <input 
          type='text'
          name='password'
          value={login.password}
          onChange={handleChange}
          className='input'
          />
        </label>
        <button>Log In Here!</button>
      </form>
    </>
  );
};

export default Login;
