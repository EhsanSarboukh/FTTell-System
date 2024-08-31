//This component allows pediatricians to enter an access code to gain permission to register on the system.
//The code is verified with the server, and if validated, the user is granted access to the registration page.
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/register.module.css";
import Header from "../pages/header";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InsertCode = () => {
  //Set a flag in local storage to indicate restricted access
  localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
  //State variables to manage the access code and any error messages
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  //Handles the "Back" button click, navigating the user back to the login screen
  const handleClickToBack = () => {
    navigate('/login');
  };
  
  // handleSignUpAccess Function handles the form submission to validate the access code
  const handleSignUpAccess = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    try {
      //Send the access code to the server for validation
      const response = await axios.post('http://localhost:5001/createCode/checkCode', { code }); 
      //If the code is valid, grant access and navigate to the registration page
      if (response.data.status === 'Success') {
        localStorage.setItem('canAccessRegister', 'true'); // Set flag in local storage
        navigate('/register'); // Navigate to register route
      } else {
        // If the code is invalid, deny access and display an error message
        localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage

        setErrorMessage(response.data.message || 'Invalid code.');
      }
    } catch (error) {
      //Handle errors during the request
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid code.');
      } else {
        setErrorMessage('There was an error inserting the code. Please try again.');
      }
    }
  };

  return (
    <div className={styles.containerCode}>
      <div className={styles.cardCode}>
        <Header />
        <p className={styles.pForCode}>Please contact us via email to receive an access code to the system<br /><FontAwesomeIcon icon={faEnvelope} /> FTTell.diagnose@gmail.com</p>
        <h4>Only pediatrician can access the system</h4>
        <form onSubmit={handleSignUpAccess}>
          <div className={styles.formGroup}>
            <label>Code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Access Code"
              required
            />
          </div>
          <div className={styles.loginPageButton}>
            <button type="submit">Submit</button>
          </div>
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.spacer}></div>
        <div className={styles.additionalOptions}>
          <button type="button" onClick={handleClickToBack}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default InsertCode;
