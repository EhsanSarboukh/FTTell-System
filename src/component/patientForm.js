import "../styles/form.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pages/header.js";
import IdentificationContext from "./IdentificationContext.js";

const PatientForm = () => {
  localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
  const [inputs, setInputs] = useState({
    weight: '',
    birthDate: '',
    birthWeight:'',
    Month6Weight:'',
    Month12Weight:'',
    Month18Weight:'',
    Month24Weight:'',
    Month36Weight:'',
    Month48Weight:'',
    Month60Weight:'',
    motherHeight: '',
    motherWeight: '',
    motherAge: '',
    gender:'',
    alergics: '',
  });
  const [ageInMonths, setAgeInMonths] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('Apply');
  const { identification } = useContext(IdentificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient data by identification if it is provided
    if (identification) {
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`http://localhost:5001/patient/by-identification/${identification}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const patientData = await response.json();
          setInputs(patientData);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      fetchPatientData();
    }
  }, [identification]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (inputs.birthDate) {
      const ageInMonths = calculateAgeInMonths(inputs.birthDate);
      setAgeInMonths(ageInMonths);
      if (ageInMonths >= 6 && ageInMonths <= 25) {
        setButtonLabel('Next');
      } else {
        setButtonLabel('Apply');
      }
    } else {
      setButtonLabel('Apply');
    }
  }, [inputs.birthDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...inputs, ageInMonths, identification };

      const response = await fetch("http://localhost:5001/patient/DiagnoseForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      // Navigate to WebCamVideo if the button label is "Next"
      if (buttonLabel === 'Next') {
        navigate("/webCamTest");
      }else{
          navigate("/final-result");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const calculateAgeInMonths = (birthDate) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();
    return years * 12 + months;
  };

  return (
    <div>
      <Header />
      <div className='formContainer'>
            <div className='formTitles'>
            <h1 > Patient Form</h1>
            <h4>Fill the required fields according to the patient age</h4>
            </div>
      <form onSubmit={handleSubmit} className="form-patient">
        {[
          { label: 'Weight (kg) *', name: 'weight', type: 'number' },
          { label: 'Birth date *', name: 'birthDate', type: 'date' },
          {label: 'Birth weight *', name:'birthWeight',type:'number'},
          {label: '6 month weight *',name:'Month6Weight',type:'number'},
          {label: '12 month weight *',name:'Month12Weight',type:'number'},  
          {label: '18 month weight *',name:'Month18Weight',type:'number'},  
          {label: '24 month weight *',name:'Month24Weight',type:'number'},  
          {label: '36 month weight *',name:'Month36Weight',type:'number'},  
          {label: '48 month weight *',name:'Month48Weight',type:'number'},
          {label: '60 month weight *',name:'Month60Weight',type:'number'},  
          { label: 'Mother Height (cm) *', name: 'motherHeight', type: 'text' },
          { label: 'Mother Weight (kg) *', name: 'motherWeight', type: 'text' },
          { label: 'Mother age (year) *', name: 'motherAge', type: 'text' },
        ].map(({ label, name, type },index) => (
          <div key={name} className="form-patient-group">
            <label>{label}</label>
            <input type={type} name={name}  value={inputs[name]} onChange={handleChange} required={index<3 || index>9} />
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
          <label>Allergies</label>
          <textarea name="alergics" value={inputs.alergics} onChange={handleChange} />
        </div>
        <button type="submit" >{buttonLabel}</button>
      </form>
  </div>
    </div>
  );
};

export default PatientForm;