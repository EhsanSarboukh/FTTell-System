import "../styles/diagnose.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pages/header.js";
import IdentificationContext from "./IdentificationContext.js";

const Diagnose = () => {
  localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
  const [inputs, setInputs] = useState({
    Identification: ''
  });
  const { setIdentification } = useContext(IdentificationContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...inputs };

      const response = await fetch("http://localhost:5001/patient/getID", {
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

      // Save the Identification to context
      setIdentification(inputs.Identification);

      // Navigate to the next page after successful submission
      navigate("/fetus");

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <Header />
      <h2 className='h2Demo'>Insert the patient's ID to start <br></br>the diagnosing process </h2>
     
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Insert ID*:</label>
          <input  
            type="text" 
            pattern="[0-9]*"
            minLength="9"
            maxLength="9"
            name="Identification"
            value={inputs.Identification} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" >Diagnose</button>
      </form>
     
    </div>
  );
};

export default Diagnose;