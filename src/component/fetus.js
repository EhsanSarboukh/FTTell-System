import React, { useState,useContext , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import Header from "../pages/header";
import IdentificationContext from './IdentificationContext';
import "../styles/fetus.css";

const FetusPage = () => {
    localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
    const [week16Mass, setWeek16Mass] = useState('');
    const [week16Length, setWeek16Length] = useState('');
    const [week32Mass, setWeek32Mass] = useState('');
    const [week32Length, setWeek32Length] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { identification } = useContext(IdentificationContext);
    
    
    const navigate = useNavigate();

    const handleClickToBack = () => {
        navigate('/diagnose');
    };

    useEffect(() => {
        // Fetch fetus data by identification if it is provided
        if (identification) {
          const fetchFetusData = async () => {
            try {
              const response = await fetch(`http://localhost:5001/fetus/by-identification/${identification}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const fetusData = await response.json();
              setWeek16Mass(fetusData.week16Mass);
              setWeek16Length(fetusData.week16Length);
              setWeek32Mass(fetusData.week32Mass);
              setWeek32Length(fetusData.week32Length);
            } catch (error) {
              console.error('An error occurred:', error);
            }
          };
          fetchFetusData();
        }
      }, [identification]);
    

    const handleFetus = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages

        try {
            const response = await axios.post('http://localhost:5001/fetus/fetus', {
                identification,
                week16Mass,
                week16Length,
                week32Mass,
                week32Length
            });
            console.log('Response:', response.data);

            if (response.data.type === 'success') {
                navigate('/PatientForm');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`);
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div>
            <Header />
            <h2 className='h2Demo'>Fetus Data</h2>
                <form  className="fetus-form" onSubmit={handleFetus}>
                    <div className='fetus-form-group'>
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
              
            </div>
            <div className='backButton'>
        <button onClick={handleClickToBack}>Back</button>
        </div>
        </div>
    );
};

export default FetusPage;
