const { spawn } = require('child_process'); // Import the 'child_process' module to create and control child processes.
const express = require('express'); //Import the Express framework to create a router for handling HTTP requests.
const router = express.Router(); //Create a new router instance for defining routes.
const Patient = require('../models/patientdb');
const Fetus = require('../models/fetusdb');
const main1 = require('../controllers/PostnatalGrowthExaminingFormulas');
const main2 = require('../controllers/PerinatalGrowthExamining');
const unLinkFiles = require('../controllers/unlinkFiles');
const cryptData = require('../controllers/crypto');
const path = require('path');
const fs = require('fs'); //Import the 'fs' module for file system operations.
let camTestResult;


const executePythonScript = (id) => {
  return new Promise((resolve, reject) => {
    let dataToSend = '';
    // spawn new child process to call the python script with the parameter
    const pythonProcess = spawn('python', ['./Emotion_Detection_FER/main.py', id]);
    
    // collect data from script
    pythonProcess.stdout.on('data', (data) => {
      console.log('Pipe data from python script ...');
      dataToSend += data.toString();
    });

    // collect error output from the python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data.toString()}`);
    });

    // in close event we are sure that stream from child process is closed
    pythonProcess.on('close', (code) => {
      console.log(`child process closed with code ${code}`);
      if (code === 0) {
        resolve(dataToSend);
      } else {
        reject(`Python script closed with code ${code}`);
      }
    });
  });
};
//Delete video and JSON files associated with the given ID
router.get('/deleteFiles/:identification', async(req, res)=>{
    const id =req.params.identification;
      unLinkFiles.unLinkFiles('./Emotion_Detection_FER/videos/'+ id+'.mp4');
      unLinkFiles.unLinkFiles('./Emotion_Detection_FER/'+ id+'.json'); 
      res.status(201).json({message:"Succesfully",type:  "success"});

});


// GET Patient data and process with main functions
router.get('/finalResult/:identification', async (req, res) => {
  const id = req.params.identification;

  console.log(`Received request for ID: '${id}' (Type: ${typeof id})`);
  try {
    //Retrieve encrypted patient and fetus data from the database
    const PatientData = await Patient.findOne({ id: cryptData.encrypt(id) });
    const FetusData = await Fetus.findOne({ id: cryptData.encrypt(id) });


    if (!PatientData) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    if (!FetusData) {
      return res.status(404).json({ error: 'Fetus not found' });
    }
    //Destructure relevant fields from the patient and fetus data
    const { gender, birthWeight, ageInMonth, Month6Weight, Month12Weight, Month18Weight, Month24Weight, Month36Weight, Month48Weight, Month60Weight, alergics} = PatientData;
    const { birthWeightFetus, week16Mass, week16Length, week32Mass, week32Length } = FetusData;
    //Process the data using the main functions from the controllers
    const formulasResult = main1.main(id, gender, birthWeight, Month6Weight, Month12Weight, Month18Weight, Month24Weight, Month36Weight, Month48Weight, Month60Weight);
    const fetusResult = main2.main(id, birthWeightFetus, week16Mass, week16Length, week32Mass, week32Length);

    let responseToClient = JSON.stringify({ formulasResult, fetusResult, alergics });

    // if the child is healthy according to the formulas we dont have to another tests, otherwise check if the child's age in months between 6 to 25 execute the webCam test 
  
    if (ageInMonth >= 6 && ageInMonth <= 25) {
      const pythonResult = await executePythonScript(id);
      const myArray = pythonResult.split("\n");
      console.log(myArray);
      console.log("done");


      let affect;
      const selectedLines = myArray.slice(3, 5);
      //Analyze the emotion detection results and determine if there is a high probability of FTT
      if (
        (selectedLines[0].indexOf("the upper") > 0) &&
        (
          selectedLines[1].indexOf("sad") > 0 ||
          selectedLines[1].indexOf("angry") > 0 ||
          selectedLines[1].indexOf("disgust") > 0 ||
          selectedLines[1].indexOf("fear") > 0 ||
          selectedLines[1].indexOf("neutral") > 0
        )
      ) {
        affect = "There are a high probability that the patient suffers from FTT";
      } else {
        affect = "There are a high probability that the emotion detection test does not affect the result!";
      }
      //Include the emotion detection results and the affect analysis in the response
      responseToClient = JSON.stringify({ formulasResult, fetusResult, selectedLines, affect, alergics});
    }
   
    // Save the result into the patient's document
    await Patient.findOneAndUpdate(
      { "id": cryptData.encrypt(id) },
      { $set: { "result": responseToClient } },
      { new: true, upsert: true }
    );
    //Send the final response to the client
    res.json(JSON.parse(responseToClient));

  } catch (err) {
    console.error('Error retrieving Patient data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
