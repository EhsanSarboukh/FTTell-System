// home.js
import React from 'react';
import Header from "../pages/header"; // Import the Header component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icon
import styles from '../styles/finalResult.css'; // Import the CSS file for styling
import { useNavigate, useLocation } from 'react-router-dom'; // Import hooks for navigation and location

const DemoFinalResult = () => {
    // Set a flag in local storage to restrict access to the registration page
    localStorage.setItem('canAccessRegister', 'false'); 
    const navigate = useNavigate(); // Hook to navigate programmatically
    const location = useLocation(); // Hook to access the current location object

    const result = location.state?.result; // Get the result from the state passed via navigation
    console.log(result); // Log the result for debugging

    const handleClick = () => {
        navigate('/'); // Navigate back to the home page
    };
    
    return (
        <div>
            <Header />
            <div className="containerResultDemo">
                <div className="centered-header">
                    <h1>Final Result Test <FontAwesomeIcon icon={faFileMedicalAlt} /></h1>
                </div>
                <p id='note'>
                    <h3>Please note!, this test does not replace a qualified pediatrician's diagnosis.</h3>
                    A pediatrician should be visited if the child has symptoms of growth problems
                </p>
                <div className="cardFinalResult">
                    <div className="result-section">
                        <p>{result.fetusResult}</p> {/* Display the fetus result */}
                        <p>{result.patientResult}</p> {/* Display the patient result */}
                    </div>
                </div>
            </div>
            <button onClick={handleClick} className='backButton'>Back</button> {/* Button to go back */}
        </div>
    );
};

export default DemoFinalResult; // Export the DemoFinalResult component
