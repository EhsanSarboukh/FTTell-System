
const axios = require('axios');// add this to make the post request of the api/chat works 
const express = require('express');
const {spawn} = require('child_process');
const multer = require('multer');
var cors = require("cors");
var bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
var mongoose = require("mongoose");
const router = express.Router();//new
require('dotenv').config();
mongoose
    .connect(process.env.mongodb_url)
    .then(()=> console.log("Connected To MongoDB..."))
    .catch((err)=> console.log(err));

const pediatricianRouter = require('./routes/pediatrician');
const patientRouter = require('./routes/patient'); // new
const fetustRouter = require('./routes/fetus'); 
const finalResults = require('./routes/finalResult');
const demoFinalResult = require('./routes/demoFinalResult');
const creatingCode = require('./routes/createCode');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/pediatrician', pediatricianRouter); // Use the pediatrician router** new
app.use('/patient', patientRouter); // Use the pediatrician router** new
app.use('/fetus', fetustRouter);
app.use('/finalResult', finalResults);
app.use('/demoFinalResult', demoFinalResult);
app.use('/createCode', creatingCode);


// Create a storage object with multer to store the video files in the desired directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './Emotion_Detection_FER/videos';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
app.get('/', (req, res)=>{
   console.log("landing page");
});

//const upload = multer({ storage });
var upload = multer({ storage: storage })// new 
app.post('/upload', upload.single('video'), (req, res) => {
    res.json({ filePath: req.file.path });
});




// by this post request we can interact with OpenAI API
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).send({ error: "Prompt is required" });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'A pediatrician assistant who provides a nutrition plan.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error fetching chat response:', error.response.data);
        res.status(500).send('Error fetching chat response');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
