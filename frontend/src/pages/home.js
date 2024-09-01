// home.js
import React from 'react';
import Header from "./header"; // Import the Header component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/home.css'; // Import the CSS file for styling

const Home = () => {
    // Set a flag in local storage to restrict access to the registration page
    localStorage.setItem('canAccessRegister', 'false'); 

    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleClick = () => {
        navigate('/diagnose'); // Navigate to the diagnose page on button click
    };

    return (
        <div>
            <Header />
            <div className="home-container">
                <h1 className="home-title">Welcome To FTTell</h1>
                <p className="home-description">
                    To diagnose a patient, start by entering the child's fetal weight and complete the required child information.
                    <br></br>
                    For patients aged 6-25 months, an emotion recognition test requiring a connected camera is necessary.
                    <br></br> Ensure your camera is properly connected before starting the test.
                    <br></br>
                    <span className="highlight">Remember! Precise data entry is crucial for achieving accurate diagnostic results.</span>
                </p>
                <button className="home-button" onClick={handleClick}>
                    Diagnose Patient
                </button>
            </div>
        </div>
    );
};

export default Home; // Export the Home component
