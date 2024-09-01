const express = require('express'); //Import the Express framework to create a router for handling HTTP requests.
const main1 = require('../controllers/PostnatalGrowthExaminingFormulas');
const main2 = require('../controllers/PerinatalGrowthExamining');
const router = express.Router();// Create a new router instance for defining routes.
//...patientData
router.post('/demoFetuslResult', async (req, res) => {
    //Destructure the relevant fields from the request body
    const { birthWeightFetus, week16Mass, week16Length, week32Mass, week32Length } = req.body;

  
    // Check for required fields, and if any are missing, return a 400 status with an error message
    if (!birthWeightFetus || !week16Mass || !week16Length || !week32Mass || !week32Length) {
        return res.status(400).json({ message: "Missing required fields in fetus data", type: "error" });
    }

    try {
        //Call the main function from the PerinatalGrowthExamining controller to process the data
        const fetusResult = main2.main("(Your child)", birthWeightFetus, week16Mass, week16Length, week32Mass, week32Length);
       //Package the result into an object
        const result2 = {
            fetusResult,
           
        };
        //// Return a successful response with the result
        res.status(200).json({ type: 'success', result2 });
    } catch (error) {
        //Handle any errors that occur during processing
        console.error('Error processing data:', error);
        res.status(500).json({ message: "Server error", type: "error" });
    }
});

router.post('/demoPatientResult', async (req, res) => {
    //Destructure the relevant fields from the request body
    const { gender, birthWeight, ageInMonth, Month6Weight, Month12Weight, Month18Weight, Month24Weight, Month36Weight, Month48Weight, Month60Weight } = req.body;
    console.log(req.body);
    try {
        //Call the main function from the PostnatalGrowthExaminingFormulas controller to process the data
        const patientResult = main1.main("(Your child)", gender, Number(birthWeight), Number(Month6Weight), Number(Month12Weight), Number(Month18Weight), Number(Month24Weight), Month36Weight, Number(Month48Weight), Number(Month60Weight));
        //Package the result into an object
        const result1 = { patientResult };
        res.status(200).json({ type: 'success', result1 });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ message: "Server error", type: "error" });
    }
});

module.exports = router; //Export the router to be used in other parts of the application.
