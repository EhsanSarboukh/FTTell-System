const express = require('express');
const main1 = require('../controllers/PostnatalGrowthExaminingFormulas');
const main2 = require('../controllers/PerinatalGrowthExamining');
const router = express.Router();
//...patientData
router.post('/demoFetuslResult', async (req, res) => {
    const { birthWeightFetus, week16Mass, week16Length, week32Mass, week32Length } = req.body;

    // Check for required fields
    if (!birthWeightFetus || !week16Mass || !week16Length || !week32Mass || !week32Length) {
        return res.status(400).json({ message: "Missing required fields in fetus data", type: "error" });
    }

    try {
        const fetusResult = main2.main("(Your child)", birthWeightFetus, week16Mass, week16Length, week32Mass, week32Length);
       
        const result2 = {
            fetusResult,
           
        };
        console.log(result2)
        res.status(200).json({ type: 'success', result2 });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ message: "Server error", type: "error" });
    }
});

router.post('/demoPatientResult', async (req, res) => {
    const { gender, birthWeight, ageInMonth, Month6Weight, Month12Weight, Month18Weight, Month24Weight, Month36Weight, Month48Weight, Month60Weight } = req.body;
    console.log(req.body);
    try {

        const patientResult = main1.main("(Your child)", gender, Number(birthWeight), Number(Month6Weight), Number(Month12Weight), Number(Month18Weight), Number(Month24Weight), Month36Weight, Number(Month48Weight), Number(Month60Weight));
        const result1 = { patientResult };
        res.status(200).json({ type: 'success', result1 });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ message: "Server error", type: "error" });
    }
});

module.exports = router;