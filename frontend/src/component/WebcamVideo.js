import React, { useState, useRef, useCallback, useEffect,useContext } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera , faHandPointRight    } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import Header from "../pages/header.js";
import IdentificationContext from "./IdentificationContext.js";
import { useNavigate } from 'react-router-dom';
import styles from "../styles/webCamTest.css"



const WebcamStreamCapture = () => {
    localStorage.setItem('canAccessRegister', 'false'); // Set flag in local storage
    const [webcamActive, setWebcamActive] = useState(false);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const { identification } = useContext(IdentificationContext);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );
    const navigate = useNavigate();

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef]);

    const uploadRecording = async (blob) => {
        const formData = new FormData();
        const id= identification + ".mp4";
        console.log(id);
        formData.append('video', blob, id);
        

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data.filePath);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        navigate("/final-result");
    };
     


    const handleRecordingComplete = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            uploadRecording(blob);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    useEffect(() => {
        if (!capturing && recordedChunks.length > 0) {
            handleRecordingComplete();
        }
    }, [capturing, recordedChunks, handleRecordingComplete]);

    const handleWebcamToggle = () => {
        setWebcamActive((prev) => !prev);
    };

    return (
        <div>
            <Header/>
           
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
               <p className="instruction-text">  <FontAwesomeIcon icon={faHandPointRight    } /> 1. Adjust the camera so that the face of the patient is clearly shown.<br></br>
                <FontAwesomeIcon icon={faHandPointRight    } />2. Let the infant sit on the mother's lap with a few toys on a table in front, providing a relaxed environment for potential emotion expression.<br></br>
                <FontAwesomeIcon icon={faHandPointRight    } />3. Engage the infant in a 1.5-minute face-to-face interaction with the experimenter.<br></br>
                
                <FontAwesomeIcon icon={faHandPointRight    } />4. Present three toys - a mask, a jack-in-the-box, and balloon noise - for 1.5 minutes to provoke emotional responses in the infant<br></br>
                <FontAwesomeIcon icon={faHandPointRight    } />5. Follow this with a 2-minute face-to-face interaction between the infant and the mother.<br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the last dyadic interaction segment, instruct mothers to engage with their infants in a manner similar to how they would typically play with them at home. <br></br>             
               </p>
               </div>
                </div>
            
       
        </div>
       
    );
};

export default WebcamStreamCapture;
