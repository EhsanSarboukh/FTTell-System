// home.js
import React from 'react';
import Header from "../pages/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/finalResult.css';

import { useNavigate,useLocation } from 'react-router-dom';


const DemoFinalResult = () => {
    localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
    const navigate = useNavigate(); 
    const location = useLocation();

    const result = location.state?.result; // Get the result from the state
    console.log(result);
    const handleClick = () => {
        navigate('/');
      };

    
    return (

        <div>
            <Header />
            <div className="containerResultDemo">
            <div className="centered-header">
            <h1>Final Result Test <FontAwesomeIcon icon={faFileMedicalAlt} /></h1>
            </div>
            <p id='note'> <h3>Please note!, this test does not replace a qualified pediatrician's diagnosis.</h3>
          
             A pediatrician should be visited if the child has symptoms of growth problems</p>
            
          <div className="cardFinalResult">
             <div className="result-section">
                <p>{result.fetusResult}</p>
                <p>{result.patientResult}</p>
             </div>
          </div>
           
       
     </div>
     <button onClick={handleClick} className='backButton'>Back</button>
        </div>
        
    );
};

export default DemoFinalResult;
