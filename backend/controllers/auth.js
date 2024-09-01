const jsonwebtoken = require("jsonwebtoken"); // Import the jsonwebtoken module for handling JWTs

const auth = (req, res, next) => {
  try {
    // Extract the access token from the Authorization header
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    
    // Verify the token using the secret key (salt) from the environment variables
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);
    
    // Attach the decoded JWT payload to the request object for use in subsequent middleware or routes
    req.user = jwt_payload;
  } catch (e) {
    // If token verification fails, return a 401 Unauthorized response with a message
    res.status(401).json({
      status: "failed",
      message: "Unauthorized!",
    });
    return; // Exit the middleware to prevent further processing
  }
  
  // Call the next middleware function in the stack
  next();
};

module.exports = auth; // Export the auth middleware function
