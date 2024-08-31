// login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/login.module.css";
import Header from "../pages/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage, this flag is useful for restricting access to authorized pediatrician screens.

  const [username, setUsernameForDoctor] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  // handleClickToRegister function is activated when the Sign Up button is clicked
  const handleClickToRegister = () => {
    navigate('/checkCode');
  };

  // handleClickToDemo function is activated when the demo diagnose button is clicked
  const handleClickToDemo = () => {
    navigate('/demoDiagnose');
  };

  // handleLoginSubmit function is activated when the Login button is clicked
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // stop the form's default submission process so that the form data can be handled through JavaScript
    setErrorMessage(''); // Clear previous error messages
    try {
      const response = await axios.post('http://localhost:5001/pediatrician/login', { username, password }); // request is being sent to the server with the user's data
      if (response.data.accessToken) { // check if the server provides an accessToken
        localStorage.setItem('token', response.data.accessToken); // set the token in local storage 
        navigate('/home');
      } else { // If the user does not exist in the system, the server does not issue a token, and an appropriate message is displayed.
        setErrorMessage(response.data.message || 'Invalid username or password.');
      }
    } catch (error) { // catching errors
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password.');
      } else {
        console.error('There was an error logging in!', error);
        setErrorMessage('There was an error logging in. Please try again.');
      }
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.rightSlide}>
        <div className={styles.card}>
          <Header />
          <h1>Login <FontAwesomeIcon icon={faUser} className={styles.userIcon} /> {/* User icon inside a circle */}</h1>
          <h4>Only pediatrician can access the system</h4>
          <form onSubmit={handleLoginSubmit}>
            <div className={styles.formGroup}>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsernameForDoctor(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className={styles.loginPageButton}>
              <button type="submit">Login</button>
            </div>
          </form>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.spacer}></div>
          <div className={styles.signUp}>
            <p>Don't have an account?</p>
            <button type="button" onClick={handleClickToRegister}>Sign Up</button>
          </div>
          <div className={styles.additionalOptions}>
            <p>If you are not a pediatrician, you can try the Demo System</p>
            <button type="button" onClick={handleClickToDemo}>Demo Diagnose</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
