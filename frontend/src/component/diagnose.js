import "../styles/diagnose.css"; // Import the CSS file for styling
import { useState, useContext } from "react"; // Import hooks from React
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Header from "../pages/header.js"; // Import the Header component
import IdentificationContext from "./IdentificationContext.js"; // Import IdentificationContext for managing identification state

const Diagnose = () => {
  // Set a flag in local storage to restrict access to the registration page
  localStorage.setItem('canAccessRegister', 'false'); 
  
  const [inputs, setInputs] = useState({
    Identification: ''
  }); // State to manage form inputs
  
  const { setIdentification } = useContext(IdentificationContext); // Use context to set identification
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value })); // Update input state when the user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = { ...inputs }; // Prepare form data

      // Send a POST request to the server to verify the patient ID
      const response = await fetch("http://localhost:5001/patient/getID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok"); // Handle error if the response is not ok
      }

      const data = await response.json(); // Parse the JSON response
      console.log(data); // Log the response for debugging

      // Save the Identification to context
      setIdentification(inputs.Identification);

      // Navigate to the next page after successful submission
      navigate("/fetus");

    } catch (error) {
      console.error("An error occurred:", error); // Log any errors that occur during the request
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

export default Diagnose; // Export the Diagnose component
