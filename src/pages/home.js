// home.js
import React from 'react';
import Header from "./header";
import { useNavigate} from 'react-router-dom';
import   '../styles/home.css';

const Home = () => {
    localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage

    const navigate = useNavigate(); 



    const handleClick = () => {
        navigate('/diagnose');
      };

    
      return (
        <div>
            <Header />
            <div className="home-container">
                <h1 className="home-title">Welcome To FTTell</h1>
                <p className="home-description">To diagnose a patient, start by entering the child's fetal weight and complete the required child information
                <br></br>

                For patients aged 6-25 months, an emotion recognition test requiring a connected camera is necessary<br></br> Ensure your camera is properly connected before starting the test<br></br>

                <span className="highlight">Remember! , precise data entry is crucial for achieving accurate diagnostic results</span></p>
                <button className="home-button" onClick={handleClick}>
                    Diagnose Patient
                </button>
            </div>
          
        </div>
    );
};

export default Home;