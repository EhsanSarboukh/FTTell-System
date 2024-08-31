// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/register.module.css';
import Header from "../pages/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; // Import the check icon

// define and manage the state for various inputs and messages within the SignUp component, enabling the component to handle user input, perform validations
const SignUp = () => {
  const [id, setId] = useState('');
  const [medicalClinic, setMedicalClinic] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState(null); // State for popup message
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
  });
  const navigate = useNavigate();

  // handleClickToBack function is activated when the back button is clicked
  const handleClickToBack = () => {
    navigate('/login');
  };

  // manage and validate the password input by the user in real-time as they type it into the form
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // The password must meet the following criteria
    setPasswordValidation({
      length: value.length >= 8,
      number: /\d/.test(value),
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
    });
  };

  // handleSignUp function is activated when the Sign Up button is clicked
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    const { length, number, lowercase, uppercase } = passwordValidation;

    if (!length || !number || !lowercase || !uppercase) { // Check if the password contains all the criteria
      setErrorMessage('Password does not meet the required criteria.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/pediatrician/register', { id, username, password, medicalClinic }); // request is being sent to the server with the pediatrician's data
     

      if (response.data.type === 'success') { // If the registration was successful, navigate to the login page 
        navigate('/login');
        alert("Your registration has been received in the system, please log in to start the diagnostic process"); // show a pop up message 

     
      } else {
        setErrorMessage(response.data.message || 'Invalid registration details.');
      }
    } catch (error) { // catching errors
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid registration details.');
      } else {
        console.error('There was an error registering!', error);
        setErrorMessage('There was an error registering. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
       <div className={styles.card}>
      <Header />
      <h1>Register</h1>
      <form onSubmit={handleSignUp}>
        <div className={styles.formGroup}>
          <label>ID:</label>
          <input
            type="text"
            pattern="[0-9]*"
            minLength="9"
            maxLength="9"
            value={id}
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      <div id="message" className={styles.message}>
        <h3>Password must contain the following:</h3>
        
        <p><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} /> A <b>lowercase</b> letter.</p>
        <p><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} /> A <b>capital (uppercase)</b> letter.</p>
        <p><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} /> A <b>number.</b></p>
        <p><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} /> Minimum <b>8 characters.</b></p>
      </div>
        <div>
        <div className={styles.formGroup}>
          <label>Medical Clinic:</label>
          <input
            type="text"
            value={medicalClinic}
            onChange={(e) => setMedicalClinic(e.target.value)}
             placeholder="Medical Clinic"
            required
          />
        </div>
        </div>
       
        <button type="submit" >Sign Up</button>
        <div className={styles.backButton}>
        <button onClick={handleClickToBack}>Back</button>
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
      </div>
    </div>
  );
};

export default SignUp;
