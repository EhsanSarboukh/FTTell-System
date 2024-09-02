const axios = require('axios'); // Import axios for making HTTP requests (used for OpenAI API interaction)
const express = require('express'); // Import Express module for creating the server and handling routes
const { spawn } = require('child_process'); // Import spawn from child_process to handle child processes
const multer = require('multer'); // Import multer for handling file uploads
var cors = require("cors"); // Import CORS to allow cross-origin resource sharing
var bodyParser = require("body-parser"); // Import body-parser to parse incoming request bodies
const path = require('path'); // Import path for handling file and directory paths
const fs = require('fs'); // Import fs (File System) for interacting with the file system
var mongoose = require("mongoose"); // Import mongoose for interacting with MongoDB
const router = express.Router(); // Import Router for defining routes
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB using the connection string from the environment variables
mongoose
    .connect(process.env.mongodb_url)
    .then(() => console.log("Connected To MongoDB..."))
    .catch((err) => console.log(err));

// Import routers for different routes
const pediatricianRouter = require('./routes/pediatrician');
const patientRouter = require('./routes/patient');
const fetusRouter = require('./routes/fetus'); 
const finalResults = require('./routes/finalResult');
const demoFinalResult = require('./routes/demoFinalResult');
const creatingCode = require('./routes/createCode');

const app = express(); // Create an Express application
const port = 5001; // Define the port the server will listen on

app.use(cors()); // Use CORS to handle cross-origin requests
app.use(bodyParser.json()); // Use body-parser to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser to parse URL-encoded request bodies

// Define routes for different functionalities using the imported routers
app.use('/pediatrician', pediatricianRouter); 
app.use('/patient', patientRouter); 
app.use('/fetus', fetusRouter);
app.use('/finalResult', finalResults);
app.use('/demoFinalResult', demoFinalResult);
app.use('/createCode', creatingCode);

// Multer configuration for handling video file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './Emotion_Detection_FER/videos';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Create the directory if it doesn't exist
        }
        cb(null, dir); // Specify the directory where files should be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`); // Use the original file name for saving
    }
});

app.get('/', (req, res) => {
    console.log("landing page");
});

// Multer setup for single file uploads (handling video uploads)
var upload = multer({ storage: storage });
app.post('/upload', upload.single('video'), (req, res) => {
    res.json({ filePath: req.file.path }); // Respond with the file path after successful upload
});

// POST request to interact with the OpenAI API
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).send({ error: "Prompt is required" }); // Return an error if the prompt is missing
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // Use the GPT-3.5-turbo model
            messages: [
                { role: 'system', content: 'A pediatrician assistant who provides a nutrition plan.' }, // Define the assistant's role
                { role: 'user', content: prompt } // Pass the user-provided prompt
            ],
            max_tokens: 150, // Limit the response length
            temperature: 0.7 // Set the creativity of the response
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Include the OpenAI API key from environment variables
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].message.content); // Return the response from OpenAI
    } catch (error) {
        console.error('Error fetching chat response:', error.response.data); // Log the error
        res.status(500).send('Error fetching chat response'); // Return an error response
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
