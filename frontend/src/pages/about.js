import React from 'react';
import Header from './header'; // Import the Header component
import '../styles/about.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component for icons
import { faEnvelope, faUsers, faBook } from '@fortawesome/free-solid-svg-icons'; // Import specific icons from FontAwesome
import logoOption2 from '../images/logoOption2.png'; // Import the image

const About = () => {
    // Set a flag in local storage to restrict access to the registration page
    localStorage.setItem('canAccessRegister', 'false'); 

    return (
        <div>
            <Header />
            <div className="about-container">
                <img src={logoOption2} alt="FTTell Logo" className="logo" />
                <p>
                    The FTTell system is a system for diagnosing growth problems among children aged 0 to 60 months.
                    The system was developed using scientific research as the foundation, and it makes use of computer vision and artificial intelligence technology to deliver the most precise diagnostic findings.
                    If you are a pediatrician you can register to diagnose children in real time, otherwise you can try Demo diagnose to get an indication of the child's health.
                </p>
            </div>
            
            <section id="meet-team">
                <div className="card">
                    <div className="card-content">
                        <h2><FontAwesomeIcon icon={faUsers} /> Meet the Team</h2>
                        <p>Our team consists of two software engineers, Sabeel Hamood and Ehsan Sarboukh.<br />
                            They are passionate about development and are dedicated to creating technological tools that enhance healthcare systems.<br />
                            Feel free to contact the team at:<br />
                            <FontAwesomeIcon icon={faEnvelope} /> sabeel.hamood5@gmail.com<br />
                            <FontAwesomeIcon icon={faEnvelope} /> ehsan280483@gmail.com
                        </p>
                    </div>
                </div>
            </section>
            
            <section id="impact-reports">
                <div className="card">
                    <div className="card-content">
                        <h2><FontAwesomeIcon icon={faBook} /> Important Studies</h2>
                        <p>FTELL's diagnosis is grounded in scientific research.<br />
                           You can refer to the following articles, which form the basis of our diagnostic approach.<br /></p>
                        <a href="https://incose.onlinelibrary.wiley.com/doi/10.1002/sys.21674?af=R" target="_blank" rel="noopener noreferrer">
                            Model-based diagnosis with FTTell: Diagnosing early pediatric failure to thrive
                        </a>
                        <a href="https://www.jstor.org/stable/23087342" target="_blank" rel="noopener noreferrer">
                            Facial Expressivity in Failure to Thrive and Normal Infants
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; // Export the About component
