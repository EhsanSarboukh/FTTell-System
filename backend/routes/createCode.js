const cryptData = require('../controllers/crypto'); // Import the crypto controller for encryption and decryption
const express = require('express'); // Import the Express module
const router = express.Router(); // Create an Express router instance
const Code = require('../models/codesdb'); // Import the Code model for interacting with the database

// Route for creating and saving a new encrypted code
router.post('/createCode', async (req, res) => {
    let { code } = req.body; // Extract 'code' from the request body

    try {
        code = String(code); // Ensure 'code' is treated as a string
        const cryptedCode = cryptData.encrypt(code); // Encrypt the code

        // Create a new code object with the encrypted code
        const newCode = new Code({
            code: cryptedCode
        });

        // Save the new code to the database
        const savedCode = await newCode.save();

        // Send a success response with the saved code
        res.status(201).json({ message: "New code added", type: "success", code: savedCode });
    } catch (err) {
        console.error("Error saving code:", err); // Log any errors during the save process
        res.status(500).json({ message: "Database error", type: "error" }); // Send an error response
    }
});

// Route for checking if a code exists in the database by comparing the plaintext code with stored encrypted codes
router.post('/checkCode', async (req, res) => {
    let { code } = req.body; // Extract 'code' from the request body
    const codes = await Code.find(); // Retrieve all codes from the database
    let document = null;

    for (const obj of codes) {
        try {
            // Decrypt the stored code
            const decryptedCode = cryptData.decrypt(obj.code);
            console.log(`Decrypted code from DB: ${decryptedCode}`);

            // Compare the decrypted code with the plaintext code provided in the request
            if (decryptedCode === code) {
                document = obj; // If a match is found, store the matched document
                console.log("Code has been found");

                // Send a success response once the code is found
                res.status(200).json({
                    status: "Success",
                    message: "Code found successfully!",
                });
                return; // Exit the function once a match is found and the response is sent
            }
        } catch (decryptError) {
            console.error('Decryption error:', decryptError); // Log any errors during decryption
            continue; // Continue to the next iteration if decryption fails
        }
    }

    // Send an error response if no matching code is found after checking all codes
    res.status(401).json({ message: 'Invalid code.' });
});

module.exports = router; // Export the router for use in other parts of the application
