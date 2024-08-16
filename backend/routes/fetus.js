const cryptData = require('../controllers/crypto')
const express = require('express');
const router = express.Router();
const Fetus = require('../models/fetusdb');

// Define the POST route for /pediatrician/fetus
router.post('/fetus', async (req, res) => {
    const fetus = req.body;
    console.log(req.body);
    try {
        // Check for required fields
        if (!fetus.week16Mass || !fetus.week16Length || !fetus.week32Mass || !fetus.week32Length || !fetus.identification) {
            return res.status(400).json({ message: "Missing required fields", type: "error" });
        }
        let document = await Fetus.findOne({ id: cryptData.encrypt(fetus.identification) });

        if(!document){
        // Create a new fetus object
            const newFetus = new Fetus({
                id: cryptData.encrypt(fetus.identification),
                birthWeightFetus: fetus.birthWeightFetus,
                week16Mass: fetus.week16Mass,
                week16Length: fetus.week16Length,
                week32Mass: fetus.week32Mass,
                week32Length: fetus.week32Length
            });

            // Save the new fetus to the database
            const savedFetus = await newFetus.save();

            res.status(201).json({ message: "New fetus added", type: "success", user: savedFetus });

        }else{
            res.status(201).json({ message: "Fetus Already exists", type: "success" });
        }
    } catch (err) {
        console.error("Error saving fetus:", err);
        res.status(500).json({ message: "Database error", type: "error" });
    }
});


router.get('/by-identification/:identification', async (req, res) => {
    const { identification } = req.params;

    try {
        const fetuses = await Fetus.find();
        let fetus = null;

        for (const obj of fetuses) {
            try {
                // Decrypt the stored ID
                const decryptedId = cryptData.decrypt(obj.id);
                console.log(`Decrypted ID from DB: ${decryptedId}`);

                // Compare the decrypted ID with the plaintext ID
                if (decryptedId === identification) {
                    fetus = obj;
                    console.log("Fetus has been found");
                    break;
                }
            } catch (decryptError) {
                console.error('Decryption error:', decryptError);
                continue;
            }
        }

        if (!fetus) {
            console.log("Fetus not found");
            return res.status(404).send('Fetus not found');
        }

        res.json(fetus);
    } catch (error) {
        console.error('Error in /by-identification/:identification route:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router; 
