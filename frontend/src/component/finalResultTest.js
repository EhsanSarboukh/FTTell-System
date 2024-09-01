import React, { useState, useEffect, useContext } from "react";
import Header from "../pages/header"; // Import the Header component
import IdentificationContext from "./IdentificationContext.js"; // Import IdentificationContext for managing identification state
import { getChatResponse } from '../services/api';  // Import the API service for chat responses
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const FinalResultTest = () => {
  // Set a flag in local storage to restrict access to the registration page
  localStorage.setItem('canAccessRegister', 'false'); 

  const [patientData, setPatientData] = useState(null); // State to hold patient data
  const [error, setError] = useState(null); // State to hold any error messages
  const [chatResponse, setChatResponse] = useState(''); // State to hold chat responses
  const { identification } = useContext(IdentificationContext); // Access identification from context
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle exiting the diagnosis and deleting related files
  const handleClickToBackHome = async() => {
    try {
      const response = await fetch(`http://localhost:5001/finalResult/deleteFiles/${identification}`);
      if (!response.ok) {
        throw new Error(`the files has not removed yet ${response.statusText}`);
      }
      navigate('/home'); // Navigate back to the home page
    } catch (error) {
      setError(`An error occurred while fetching data: ${error.message}`);
      console.error('An error occurred:', error);
    }
  };
    
  useEffect(() => {
    // Function to fetch patient data from the backend
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/finalResult/finalResult/${identification}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setPatientData(data); // Set the patient data received from the backend
        console.log("this is the data:" + data);

        if (data.formulasResult && !data.formulasResult.includes("healthy")) {
          let resultText = data.formulasResult + data.fetusResult + "The child's allergies that require consideration in the nutrition plan: " + data.alergics;
          console.log("this is the allergies:" + resultText);

          if (data.selectedLines) {
            resultText += data.selectedLines + data.affect;
          }

          // Prepare prompts for the chat API
          const chatPromptBreakfast = `The result is: ${resultText}. Write me a nutrition plan for breakfast for this child considering the allergic and the symptoms with bullet points-without including any introductory or repetitive statements.`;
          const chatPromptLunch = `The result is: ${resultText}. Write me a nutrition plan for lunch for this child considering the allergic and the symptoms with bullet points-without including any introductory or repetitive statements.`;
          const chatPromptDinner = `The result is: ${resultText}. Write me a nutrition plan for dinner for this child considering the allergic and the symptoms with bullet points-without including any introductory or repetitive statements.`;

          // Fetch chat responses for breakfast, lunch, and dinner plans
          const chatResponseBreakfast = await getChatResponse(chatPromptBreakfast);
          const chatResponseLunch = await getChatResponse(chatPromptLunch);
          const chatResponseDinner = await getChatResponse(chatPromptDinner);

          setChatResponse({
            breakfast: chatResponseBreakfast,
            lunch: chatResponseLunch,
            dinner: chatResponseDinner
          });
        }
      } catch (error) {
        setError(`An error occurred while fetching data: ${error.message}`);
        console.error('An error occurred:', error);
      }
    };

    if (identification) {
      fetchPatientData(); // Fetch data only if identification is available
    }
  }, [identification]);

  if (error) {
    return (
      <div>
        <Header />
        <h1>Final Results</h1>
        <p>{error}</p> {/* Display any errors */}
      </div>
    );
  }

  if (!patientData) {
    return (
      <div>
        <Header />
        <h1>Final Result Test</h1>
        <p>Loading...</p> {/* Display a loading message while data is being fetched */}
      </div>
    );
  }

  let resultText = patientData.formulasResult + patientData.fetusResult;
  if (patientData.selectedLines) {
    resultText += patientData.selectedLines + patientData.affect;
  }

  const formattedText = resultText.replace(/(Fetal Growth|Fetal Birth)/g, '\n$1');

  // Helper function to format text with ** as bold
  const formatTextWithBold = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g); // Split text by parts that are enclosed in **
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>; // Render bold text without ** markers
      } else {
        return <span key={index}>{part}</span>; // Render normal text
      }
    });
  };

  return (
    <div className="containerResult">
      <Header />
      <div className="centered-header">
        <h1>Final Result Test <FontAwesomeIcon icon={faFileMedicalAlt} /></h1>
      </div>
      <div className="cardFinalResult">
        <div className="result-section">
          {formattedText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        {chatResponse.breakfast && (
          <div className="chatResponse">
            <h2>Breakfast Nutrition Plan</h2>
            {chatResponse.breakfast.split('\n').map((line, index) => (
              <p key={index}>{formatTextWithBold(line)}</p>
            ))}
          </div>
        )}
        {chatResponse.lunch && (
          <div className="chatResponse">
            <h2>Lunch Nutrition Plan</h2>
            {chatResponse.lunch.split('\n').map((line, index) => (
              <p key={index}>{formatTextWithBold(line)}</p>
            ))}
          </div>
        )}
        {chatResponse.dinner && (
          <div className="chatResponse">
            <h2>Dinner Nutrition Plan</h2>
            {chatResponse.dinner.split('\n').map((line, index) => (
              <p key={index}>{formatTextWithBold(line)}</p>
            ))}
          </div>
        )}
      </div>
      <div className='ExitDiagnoseButton'>
        <button onClick={handleClickToBackHome}>Exit the diagnose</button>
      </div>
    </div>
  );
};

export default FinalResultTest; // Export the FinalResultTest component
