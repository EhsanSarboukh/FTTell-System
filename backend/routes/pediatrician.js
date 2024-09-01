const bcrypt = require('bcrypt'); //Import bcrypt for hashing passwords and comparing hashes.
const express = require('express');
const router = express.Router();
const Pediatrician = require('../models/pediatriciandb');
const jwtManager = require("../controllers/jwtManager");


// Register a new pediatrician
router.post('/register', async (req, res) => {
    const pediatrician = req.body;
    // Check for required fields
    if (!pediatrician.id || !pediatrician.username || !pediatrician.password || !pediatrician.medicalClinic) {
        return res.status(400).json({ message: "Missing required fields", type: "error" });
    }
    try{
        
        let checkUser = await Pediatrician.findOne({username :pediatrician.username.toLowerCase()});
        //Check if a pediatrician with the same username already exists
        if(!checkUser){
            //Hash the password and ID using bcrypt
            const hashedPassword = await bcrypt.hash(pediatrician.password, Number(process.env.SALT_ROUNDS));
            const hashedId = await bcrypt.hash(pediatrician.id, Number(process.env.SALT_ROUNDS));
            //Create a new Pediatrician document with the hashed password and ID
            const newPediatrician = new Pediatrician({
                id: hashedId,
                username: pediatrician.username.toLowerCase(),
                password: hashedPassword,
                medicalClinic: pediatrician.medicalClinic
            });
            //Generate a JWT access token for the new pediatrician
            const accessToken = jwtManager(newPediatrician);
            //Save the new pediatrician to the database
            const savedPediatrician = await newPediatrician.save();
            //Respond with success and return the saved pediatrician and access token
            return res.status(200).json({ message: "New user added", type: "success", user: savedPediatrician,  accessToken: accessToken  });
        }

        return res.status(200).json({message: "Username already in use please choose another one!",
            type : "failed" 
        });
      
      
    } catch (err) {
        console.error("Error saving pediatrician:", err);
        res.status(500).json({ message: "Database error", type: "error" });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the pediatrician by username in the database
        const foundUser = await Pediatrician.findOne({ username: username.toLowerCase()});
        if (!foundUser) {
            return res.status(401).send('Invalid username or password.');
        }
        //Compare the provided password with the stored hashed password
        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (err) {
                console.error('Error during password comparison:', err);
                return res.status(500).send('Internal server error');
            }

            if (result) {
                // Successful login
                console.log("Successful login");
               //Generate a JWT access token for the logged-in pediatrician
                const accessToken = jwtManager(foundUser);
                //success response...
                //Respond with success, returning the access token and username
                res.status(200).json({
                  status: "Success",
                  message: "User logged in successfully!",
                  accessToken: accessToken,
                  username:username
                });

                
                
            } else {
                
               
                //If the password comparison fails, send an unauthorized response
                return res.status(401).send('Invalid username or password.');
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});

module.exports = router;
