const express = require('express'); // Import the Express module
const router = express.Router(); // Create an Express router instance
const Patient = require('../models/patientdb'); // Import the Patient model for interacting with the patient database
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing (though it doesn't seem used here)
const cryptData = require('../controllers/crypto'); // Import the crypto controller for encryption and decryption
const saltRounds = 12; // Define the number of salt rounds for bcrypt (again, not used in the current code)

// Handle POST request to '/DiagnoseForm' for creating or updating patient data
router.post('/DiagnoseForm', async (req, res) => {
    const patient = req.body; // Extract the patient data from the request body
    let fieldsToUpdate; // Variable to hold the name of the field to update based on age in months
    console.log(req.body); // Log the request body for debugging

    try {
        const patients = await Patient.find(); // Retrieve all patients from the database
        let document = null;

        // Iterate through the list of patients to find the one with the matching decrypted ID
        for (const obj of patients) {
            try {
                // Decrypt the stored ID
                const decryptedId = cryptData.decrypt(obj.id);
                console.log(`Decrypted ID from DB: ${decryptedId}`);

                // Compare the decrypted ID with the plaintext ID from the request
                if (decryptedId === patient.identification) { // Fixed to use patient.identification instead of undefined 'identification'
                    document = obj;
                    console.log("Patient has been found");
                    break; // Exit the loop once the match is found
                }
            } catch (decryptError) {
                console.error('Decryption error:', decryptError); // Log any decryption errors
                continue; // Continue to the next iteration if decryption fails
            }
        }

        if (!document) {
            // If no existing document is found, create a new patient object
            document = new Patient({
                id: cryptData.encrypt(patient.identification), // Encrypt the identification before saving
                birthDate: patient.birthDate,
                ageInMonth: patient.ageInMonths,
                alergics: patient.alergics,
                motherHeight: patient.motherHeight,
                motherWeight: patient.motherWeight,
                motherAge: patient.motherAge,
                gender: patient.gender,
                birthWeight: patient.birthWeight,
                Month6Weight: patient.Month6Weight,
                Month12Weight: patient.Month12Weight,
                Month18Weight: patient.Month18Weight,
                Month24Weight: patient.Month24Weight,
                Month36Weight: patient.Month36Weight,
                Month48Weight: patient.Month48Weight,
                Month60Weight: patient.Month60Weight
            });
        } else {
            // Determine which field to update based on the patient's age in months
            switch (patient.ageInMonths) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    fieldsToUpdate = 'birthWeight';
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    fieldsToUpdate = 'Month6Weight';
                    break;
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    fieldsToUpdate = 'Month12Weight';
                    break;
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                    fieldsToUpdate = 'Month18Weight';
                    break;
                case 24:
                case 25:
                case 26:
                case 27:
                case 28:
                case 29:
                case 30:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                    fieldsToUpdate = 'Month24Weight';
                    break;
                case 36:
                case 37:
                case 38:
                case 39:
                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                case 46:
                case 47:
                    fieldsToUpdate = 'Month36Weight';
                    break;
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 58:
                case 59:
                    fieldsToUpdate = 'Month48Weight';
                    break;
                case 60:
                    fieldsToUpdate = 'Month60Weight';
                    break;
                default:
                    console.log('Sorry, there are no fields to update');
            }
            console.log(fieldsToUpdate);

            // Update the specific field in the document if applicable
            if (fieldsToUpdate) {
                document[fieldsToUpdate] = patient.weight;
                document['alergics'] = patient.alergics; // Update allergens information as well
            }
        }

        // Save the updated or new document back to the database
        await document.save();
        return res.json(document); // Respond with the updated patient document

    } catch (err) {
        console.error(err.message); // Log any errors that occur during the process
        res.status(500).send('Server Error'); // Respond with a server error if something goes wrong
    }

    res.status(201).json({ message: "New user added", type: "success" }); // (This line is unreachable due to the return statement above)
});

// Handle POST request to '/getID' for debugging or testing purposes
router.post('/getID', async (req, res) => {
    const patient = req.body; // Extract the patient data from the request body
    console.log(req.body); // Log the request body for debugging
    res.status(201).json({ message: "Successfully", type: "success" }); // Respond with a success message
});

// Handle GET request to retrieve a patient by their identification
router.get('/by-identification/:identification', async (req, res) => {
    const { identification } = req.params; // Extract the identification from the request parameters

    try {
        const patients = await Patient.find(); // Retrieve all patients from the database
        let patient = null;

        // Iterate through the list of patients to find the one with the matching decrypted ID
        for (const obj of patients) {
            try {
                // Decrypt the stored ID
                const decryptedId = cryptData.decrypt(obj.id);
                console.log(`Decrypted ID from DB: ${decryptedId}`);

                // Compare the decrypted ID with the plaintext ID from the request
                if (decryptedId === identification) {
                    patient = obj;
                    console.log("Patient has been found");
                    break; // Exit the loop once the match is found
                }
            } catch (decryptError) {
                console.error('Decryption error:', decryptError); // Log any decryption errors
                continue; // Continue to the next iteration if decryption fails
            }
        }

        if (!patient) {
            console.log("Patient not found"); // Log if no matching patient is found
            return res.status(404).send('Patient not found'); // Respond with a 404 if no matching patient is found
        }

        res.json(patient); // Respond with the found patient data
    } catch (error) {
        console.error('Error in /by-identification/:identification route:', error); // Log any errors during the retrieval process
        res.status(500).send('Server error'); // Respond with a server error if something goes wrong
    }
});

module.exports = router; // Export the router for use in other parts of the application
