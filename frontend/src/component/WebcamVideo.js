import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import Webcam from "react-webcam"; // Import the Webcam component for capturing video
import axios from "axios"; // Import axios for HTTP requests
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for icons
import { faCamera, faHandPointRight } from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import "../App.css"; // Import the global CSS file
import Header from "../pages/header.js"; // Import the Header component
import IdentificationContext from "./IdentificationContext.js"; // Import the IdentificationContext for managing identification state
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from "../styles/webCamTest.css"; // Import the CSS file for styling

const WebcamStreamCapture = () => {
    // Set a flag in local storage to restrict access to the registration page
    localStorage.setItem('canAccessRegister', 'false'); 

    const [webcamActive, setWebcamActive] = useState(false); // State to manage webcam activation
    const [capturing, setCapturing] = useState(false); // State to manage capturing status
    const [recordedChunks, setRecordedChunks] = useState([]); // State to store recorded video chunks
    const webcamRef = useRef(null); // Ref to access the Webcam component
    const mediaRecorderRef = useRef(null); // Ref to access the MediaRecorder instance
    const { identification } = useContext(IdentificationContext); // Access identification from context
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data)); // Append recorded data chunks
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true); // Start capturing
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable); // Listen for data availability
        mediaRecorderRef.current.start(); // Start recording
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop(); // Stop recording
        setCapturing(false); // Update capturing state
    }, [mediaRecorderRef]);

    const uploadRecording = async (blob) => {
        const formData = new FormData();
        const id = identification + ".mp4"; // Set file name using identification
        console.log(id);
        formData.append('video', blob, id); // Append video blob to form data

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data.filePath); // Log success
        } catch (error) {
            console.error('Error uploading file:', error); // Log any errors
        }
        navigate("/final-result"); // Navigate to the final result page after upload
    };

    const handleRecordingComplete = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            uploadRecording(blob); // Upload the recording
            setRecordedChunks([]); // Clear recorded chunks
        }
    }, [recordedChunks]);

    useEffect(() => {
        if (!capturing && recordedChunks.length > 0) {
            handleRecordingComplete(); // Handle recording completion when capturing stops
        }
    }, [capturing, recordedChunks, handleRecordingComplete]);

    const handleWebcamToggle = () => {
        setWebcamActive((prev) => !prev); // Toggle webcam activation
    };

    return (
        <div>
            <Header />
            <div className="Container">
                {webcamActive ? (
                    <>
                        <Webcam className="Webcam" audio={false} ref={webcamRef} />
                        <button onClick={capturing ? handleStopCaptureClick : handleStartCaptureClick}>
                            {capturing ? "Stop Capture" : "Start Capture"}
                        </button>
                    </>
                ) : (
                    <div className="CameraBox" onClick={handleWebcamToggle}>
                        <FontAwesomeIcon icon={faCamera} size="4x" color="#ffffff" className="CameraIcon" />
                    </div>
                )}
                <div className="intructions">
                    <h2>Facial Recognition Instructions</h2>
                    <p className="instruction-text">
                        <FontAwesomeIcon icon={faHandPointRight} /> 1. Adjust the camera so that the face of the patient is clearly shown.<br></br>
                        <FontAwesomeIcon icon={faHandPointRight} /> 2. Let the infant sit on the mother's lap with a few toys on a table in front, providing a relaxed environment for potential emotion expression.<br></br>
                        <FontAwesomeIcon icon={faHandPointRight} /> 3. Engage the infant in a 1.5-minute face-to-face interaction with the experimenter.<br></br>
                        <FontAwesomeIcon icon={faHandPointRight} /> 4. Present three toys - a mask, a jack-in-the-box, and balloon noise - for 1.5 minutes to provoke emotional responses in the infant<br></br>
                        <FontAwesomeIcon icon={faHandPointRight} /> 5. Follow this with a 2-minute face-to-face interaction between the infant and the mother.<br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the last dyadic interaction segment, instruct mothers to engage with their infants in a manner similar to how they would typically play with them at home. <br></br>             
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WebcamStreamCapture; // Export the WebcamStreamCapture component
