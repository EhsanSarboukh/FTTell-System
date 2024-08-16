import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/register.module.css";
import Header from "../pages/header";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InsertCode = () => {
  localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClickToBack = () => {
    navigate('/login');
  };

  const handleSignUpAccess = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    try {
      const response = await axios.post('http://localhost:5001/createCode/checkCode', { code }); 
      console.log("this is the res: ", response.data);
      if (response.data.status === 'Success') {
        localStorage.setItem('canAccessRegister', 'true'); // Set flag in local storage
        navigate('/register'); // Navigate to register route
      } else {
        localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage

        setErrorMessage(response.data.message || 'Invalid code.');
      }
    } catch (error) {
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
