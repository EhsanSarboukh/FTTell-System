const cryptData = require('../controllers/crypto'); // Import the crypto controller for encryption and decryption
const express = require('express'); // Import the Express module
const router = express.Router(); // Create an Express router instance
const Fetus = require('../models/fetusdb'); // Import the Fetus model for interacting with the fetus database

// Define the POST route for /pediatrician/fetus
router.post('/fetus', async (req, res) => {
    const fetus = req.body; // Extract the fetus data from the request body
    console.log(req.body); // Log the request body for debugging

    try {
        // Check for required fields in the request body
        if (!fetus.week16Mass || !fetus.week16Length || !fetus.week32Mass || !fetus.week32Length || !fetus.identification) {
            return res.status(400).json({ message: "Missing required fields", type: "error" }); // Respond with an error if any required fields are missing
        }

        // Encrypt the identification and check if a fetus with this ID already exists
        let document = await Fetus.findOne({ id: cryptData.encrypt(fetus.identification) });

        if (!document) {
            // If no existing document is found, create a new fetus object
            const newFetus = new Fetus({
                id: cryptData.encrypt(fetus.identification), // Encrypt the identification before saving
                birthWeightFetus: fetus.birthWeightFetus,
                week16Mass: fetus.week16Mass,
                week16Length: fetus.week16Length,
                week32Mass: fetus.week32Mass,
                week32Length: fetus.week32Length
            });

            // Save the new fetus to the database
            const savedFetus = await newFetus.save();

            // Respond with a success message and the saved fetus data
            res.status(201).json({ message: "New fetus added", type: "success", user: savedFetus });
        } else {
            // If a fetus with this ID already exists, respond with a message indicating so
            res.status(201).json({ message: "Fetus Already exists", type: "success" });
        }
    } catch (err) {
        console.error("Error saving fetus:", err); // Log any errors during the save process
        res.status(500).json({ message: "Database error", type: "error" }); // Respond with a server error if something goes wrong
    }
});

// Define the GET route for retrieving a fetus by its identification
router.get('/by-identification/:identification', async (req, res) => {
    const { identification } = req.params; // Extract the identification from the request parameters

    try {
        const fetuses = await Fetus.find(); // Retrieve all fetuses from the database
        let fetus = null;

        // Iterate through the list of fetuses to find the one with the matching decrypted ID
        for (const obj of fetuses) {
            try {
                // Decrypt the stored ID
                const decryptedId = cryptData.decrypt(obj.id);
                console.log(`Decrypted ID from DB: ${decryptedId}`);

                // Compare the decrypted ID with the plaintext ID from the request
                if (decryptedId === identification) {
                    fetus = obj; // If a match is found, store the matched fetus
                    console.log("Fetus has been found");
                    break; // Exit the loop once the match is found
                }
            } catch (decryptError) {
                console.error('Decryption error:', decryptError); // Log any decryption errors
                continue; // Continue to the next iteration if decryption fails
            }
        }

        if (!fetus) {
            console.log("Fetus not found"); // Log if no matching fetus is found
            return res.status(404).send('Fetus not found'); // Respond with a 404 if no matching fetus is found
        }

        res.json(fetus); // Respond with the found fetus data
    } catch (error) {
        console.error('Error in /by-identification/:identification route:', error); // Log any errors during the retrieval process
        res.status(500).send('Server error'); // Respond with a server error if something goes wrong
    }
});

module.exports = router; // Export the router for use in other parts of the application
