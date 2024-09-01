import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from "./header"; // Import the Header component
import styles from "../styles/landingPage.css"; // Import the CSS file for styling

const LandingPage = () => {
  // Set a flag in local storage to restrict access to the registration page
  localStorage.setItem('canAccessRegister', 'false'); 
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Navigate to the home page if the user is logged in
    }
  }, [navigate]);

  const handleClick = () => {
    navigate('/login'); // Navigate to the login page on button click
  };

  return (
    <div className='containerLanding'>
      <Header />
      <div className='detailed'>
        <p>
          Failure to thrive (FTT) is a frequently overlooked issue among infants.
          <br></br>
          FTTell reduces the risk of misdiagnosing growth problems in children aged 0 to 60 months.
          <br></br>
          This is achieved through the use of advanced technologies.
        </p>
        <button onClick={handleClick}>Diagnose Patient</button>
      </div>
    </div>
  );
};

export default LandingPage; // Export the LandingPage component
