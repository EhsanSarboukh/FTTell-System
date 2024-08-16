const cryptData = require('../controllers/crypto');
const express = require('express');
const router = express.Router();
const Code = require('../models/codesdb');

router.post('/createCode', async (req, res) => {
    let { code } = req.body; // Extract 'code' from the request body
    try {
        code = String(code); // Ensure 'code' is a string
        const cryptedCode = cryptData.encrypt(code); // Encrypt the code
        // Create a new code object
        const newCode = new Code({
            code: cryptedCode
        });

        // Save the new code to the database
        const savedCode = await newCode.save();

        res.status(201).json({ message: "New code added", type: "success", code: savedCode });
    } catch (err) {
        console.error("Error saving code:", err);
        res.status(500).json({ message: "Database error", type: "error" });
    }
});

router.post('/checkCode', async (req, res) => {
    let { code } = req.body; // Extract 'code' from the request body
    const codes = await Code.find();
    let document = null;

    for (const obj of codes) {
        try {
            // Decrypt the stored code
            const decryptedCode = cryptData.decrypt(obj.code);
            console.log(`Decrypted code from DB: ${decryptedCode}`);

            // Compare the decrypted code with the plaintext code
            if (decryptedCode === code) {
                document = obj;
                console.log("Code has been found");
                res.status(200).json({
                    status: "Success",
                    message: "Code found successfully!",
                });
                return; // Exit the function once a match is found and response is sent
            }
        } catch (decryptError) {
            console.error('Decryption error:', decryptError);
            continue;
        }
    }
    res.status(401).json({ message: 'Invalid code.' }); // Send response if no valid code is found
});

module.exports = router;
