require('dotenv').config(); // Load environment variables from a .env file
const jsonwebtoken = require("jsonwebtoken"); // Import the jsonwebtoken module for handling JWTs

const jwtManager = (user) => {
    // Generate a JWT (JSON Web Token) for the provided user
    const accessToken = jsonwebtoken.sign(
        {
            _id: user.id,        // Include the user's ID in the payload
            name: user.username, // Include the user's username in the payload
        },
        process.env.jwt_salt   // Use the secret key (salt) from the environment variable to sign the token
    );

    return accessToken; // Return the generated access token
};

module.exports = jwtManager; // Export the jwtManager function for use in other parts of the application
