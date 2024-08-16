const express = require('express');
const router = express.Router();
const Patient = require('../models/patientdb');
const bcrypt = require('bcrypt');
const cryptData = require('../controllers/crypto');
const saltRounds = 12;
// Handle POST request to '/DiagnoseForm'
router.post('/DiagnoseForm', async (req, res) => {
    const patient = req.body;
    let fieldsToUpdate;
    console.log(req.body);
    try{

        const patients = await Patient.find();
        let document = null;
        for (const obj of patients) {
            try {
                // Decrypt the stored ID
                const decryptedId = cryptData.decrypt(obj.id);
                console.log(`Decrypted ID from DB: ${decryptedId}`);

                // Compare the decrypted ID with the plaintext ID
                if (decryptedId === identification) {
                    document = obj;
                    console.log("Patient has been found");
                    break;
                }
            } catch (decryptError) {
                console.error('Decryption error:', decryptError);
                continue;
            }
        }
        if(!document){
            document= new Patient({
                id: cryptData.encrypt(patient.identification),
                birthDate: patient.birthDate,
                ageInMonth : patient.ageInMonths,
                alergics: patient.alergics,
                motherHeight: patient.motherHeight,
                motherWeight: patient.motherWeight,
                motherAge: patient.motherAge,
                gender: patient.gender,
                birthWeight: patient.birthWeight,
                Month6Weight: patient.Month6Weight,
                Month12Weight:patient.Month12Weight,
                Month18Weight: patient.Month18Weight,
                Month24Weight: patient.Month24Weight,
                Month36Weight: patient.Month36Weight,
                Month48Weight: patient.Month48Weight,
                Month60Weight: patient.Month60Weight
            });
        }else{
            switch(patient.ageInMonths){
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
                defualt:
                    console.log('sorry there is no fields to update');
            }
            console.log(fieldsToUpdate);
            if(fieldsToUpdate){
                document[fieldsToUpdate] = patient.weight;
                document['alergics'] = patient.alergics;
            }
            
        }
        await document.save();
        return res.json(document);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    res.status(201).json({ message: "New user added", type: "success"});

});



router.post('/getID',async (req,res)=>{
    const patient = req.body;
    console.log(req.body);
    res.status(201).json({message:"Succesfully",type:  "success"});

});


router.get('/by-identification/:identification', async (req, res) => {
    const { identification } = req.params;

    try {
        const patients = await Patient.find();
        let patient = null;

        for (const obj of patients) {
            try {
                // Decrypt the stored ID
                const decryptedId = cryptData.decrypt(obj.id);
                console.log(`Decrypted ID from DB: ${decryptedId}`);

                // Compare the decrypted ID with the plaintext ID
                if (decryptedId === identification) {
                    patient = obj;
                    console.log("Patient has been found");
                    break;
                }
            } catch (decryptError) {
                console.error('Decryption error:', decryptError);
                continue;
            }
        }

        if (!patient) {
            console.log("Patient not found");
            return res.status(404).send('Patient not found');
        }

        res.json(patient);
    } catch (error) {
        console.error('Error in /by-identification/:identification route:', error);
        res.status(500).send('Server error');
    }
});


  
module.exports = router;