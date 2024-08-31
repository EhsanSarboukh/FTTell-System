//This component is designed to allow users to input fetus-related data and simulate a diagnostic process.
import React, { useState } from 'react';
import Header from "../pages/header";
import Footer from "../pages/footer";
import styles from '../styles/login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/fetus.css";

const Demo = () => {
    localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage to prevent all visitors from accessing pediatricians' screens
    // State variables for user input
    const [birthWeightFetus, setBirthWeight] = useState('');
    const [week16Mass, setWeek16Mass] = useState('');
    const [week16Length, setWeek16Length] = useState('');
    const [week32Mass, setWeek32Mass] = useState('');
    const [week32Length, setWeek32Length] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleFetus = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages

        try {
            // Send fetus data to the server via a POST request
            const response = await axios.post('http://localhost:5001/demoFinalResult/demoFetuslResult', {
                birthWeightFetus,
                week16Mass,
                week16Length,
                week32Mass,
                week32Length
            });
          
            //  If the response is successful, navigate to the next screen with the result
            if (response.data.type === 'success') {
                navigate('/DemoPatientForm', { state: { result2: response.data.result2 } });
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            // Handle errors during the request
            setErrorMessage(`An error occurred: ${error.message}`);
            console.error('An error occurred:', error);
        }
    };
    //Handles the "Back" button click, navigating the user to the previous screen.
    const handleClickToBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <Header />
            <h2 className='h2Demo'>Fetus Data</h2>
            <form className='fetus-form' onSubmit={handleFetus}>
                <div className='fetus-form-group'>
                    <div>
                        <label>Birth Weight (kg) :</label>
                        <input
                            type="number"
                            value={birthWeightFetus}
                            onChange={(e) => setBirthWeight(e.target.value)}
                            placeholder='Birth Weight (kg)'
                            required
                        />
                    </div>
                    <div>
                        <label>Week 16 Mass (g):</label>
                        <input
                            type="number"
                            value={week16Mass}
                            onChange={(e) => setWeek16Mass(e.target.value)}
                             placeholder='Week 16 Mass (g)'
                            required
                        />
                    </div>
                    <div>
                        <label>Week 16 Length (cm):</label>
                        <input
                            type="number"
                            value={week16Length}
                            onChange={(e) => setWeek16Length(e.target.value)}
                              placeholder='Week 16 Length (cm)'
                            required
                        />
                    </div>
                    <div>
                        <label>Week 32 Mass (g):</label>
                        <input
                            type="number"
                            value={week32Mass}
                            onChange={(e) => setWeek32Mass(e.target.value)}
                            placeholder='Week 32 Mass (g)'
                            required
                        />
                    </div>
                    <div>
                        <label>Week 32 Length (cm):</label>
                        <input
                            type="number"
                            value={week32Length}
                            onChange={(e) => setWeek32Length(e.target.value)}
                            placeholder='Week 32 Length (cm)'

                            required
                        />
                    </div>
                </div>
  
                <div className='button-allign'>
                        <button type="submit">Next</button>
                </div>

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </form>
        <div className='backButton'>
        <button onClick={handleClickToBack}>Back</button>
        </div>

          
        </div>
    );
};

export default Demo;
