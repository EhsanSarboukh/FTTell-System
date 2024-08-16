import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import styles from "../styles/landingPage.css"


const LandingPage = () => {
  localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); 
    }
  }, [navigate]);

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className='containerLanding'>
      <Header />
      
      <div className='detailed'> <p>
      Failure to thrive (FTT) is a frequently overlooked issue among infants<br></br> FTTell reduces the risk of misdiagnosing growth problems in children aged 0 to 60 months<br></br> This is achieved through the use of advanced technologies</p>
      <button onClick={handleClick} >Diagnose Patient</button>
      </div>


     
    
    </div>
  );
};

export default LandingPage;
