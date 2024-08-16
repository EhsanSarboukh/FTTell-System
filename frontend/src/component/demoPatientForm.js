import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Header from "../pages/header";
import "../styles/form.css";



const DemoPatientForm = () => {
    localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const [ageInMonths, setAgeInMonths] = useState(0);
    const [inputs, setInputs] = useState({
        weight: '',
        birthDate: '',
        birthWeight: '',
        Month6Weight: '',
        Month12Weight: '',
        Month18Weight: '',
        Month24Weight: '',
        Month36Weight: '',
        Month48Weight: '',
        Month60Weight: '',
        motherHeight: '',
        motherWeight: '',
        motherAge: '',
        gender: '',
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));
    };
  
    const handleClickToBack = () => {
        navigate('/demoDiagnose');
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage(''); // Clear previous error messages
        if (!validateForm()) return;

        const result2 = location.state?.result2; // Get the result from the state
        const ageInMonths = calculateAgeInMonths(inputs.birthDate);
        setAgeInMonths(ageInMonths);
        const data= {...inputs,ageInMonths }
        try {

            const response = await axios.post('http://localhost:5001/demoFinalResult/demoPatientResult',data); 
            
    
            if (response.data.type !== 'success') {
                throw new Error(response.data.message);
            }
            let result;
            // Navigate to DemoFinalResult if the button label is "Next"
            const combinedResults = { ...result2, ...response.data.result1 }; // Combine results
            navigate("/DemoFinalResult", { state: { result: combinedResults } });
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`);
            console.error('An error occurred:', error);
        }
    };
    
    const calculateAgeInMonths = (birthDate) => {
        const birth = new Date(birthDate);
        const now = new Date();
        const years = now.getFullYear() - birth.getFullYear();
        const months = now.getMonth() - birth.getMonth();
        return years * 12 + months;
    };
    const validateForm = () => {
        const requiredFields = ['weight', 'birthDate', 'birthWeight', 'gender', 'motherHeight', 'motherWeight', 'motherAge'];
        for (let field of requiredFields) {
            if (!inputs[field]) {
                setErrorMessage(`Please fill out the required field: Weight, Birth Date, Birth Weight, Gender, Mother Height, Mother Weight, Mother Age`);
                return false;
            }
        }
        return true;
    };
    return (
        <div >
            <Header />
        
            <div className='formContainer'>
            <div className='formTitles'>
            <h1 > Patient Form</h1>
            <h4>Fill the required fields according to the patient age</h4>
            </div>


        



            <form  className="form-patient">
                {[
                    { label: 'Weight (kg) *', name: 'weight', type: 'number' },
                    { label: 'Birth date *', name: 'birthDate', type: 'date' },
                    { label: 'Birth weight *', name: 'birthWeight', type: 'number' },
                    { label: '6 month weight *', name: 'Month6Weight', type: 'number' },
                    { label: '12 month weight *', name: 'Month12Weight', type: 'number' },
                    { label: '18 month weight *', name: 'Month18Weight', type: 'number' },
                    { label: '24 month weight *', name: 'Month24Weight', type: 'number' },
                    { label: '36 month weight *', name: 'Month36Weight', type: 'number' },
                    { label: '48 month weight *', name: 'Month48Weight', type: 'number' },
                    { label: '60 month weight *', name: 'Month60Weight', type: 'number' },
                    { label: 'Mother Height (cm) *', name: 'motherHeight', type: 'text' },
                    { label: 'Mother Weight (kg) *', name: 'motherWeight', type: 'text' },
                    { label: 'Mother age (year) *', name: 'motherAge', type: 'text' },
                ].map(({ label, name, type }, index) => (
                    <div key={name} className="form-patient-group">
                        <label>{label}</label>
                        <input type={type} name={name} value={inputs[name]} onChange={handleChange} required={index < 3 && index > 9} />
                    </div>
                ))}
                <div className='select-gender'>
                    <label>Select Gender*:</label>
                <select
                        id="gender-select"
                        name="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                        required
                        className="form-patient-group-select"
                        >
                        <option value="" disabled>Select Gender</option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                    </select>
                </div>
                
                <div className="form-patient-group full-width">
                </div>
            </form>
            <button id= 'submitButton' type="submit"  onClick={handleSubmit}>Apply</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        <div className='backButton'>
        <button onClick={handleClickToBack}>Back</button>
        </div>
        </div>

    );
};

export default DemoPatientForm;      

