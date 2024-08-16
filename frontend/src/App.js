import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import WebcamVideo from "./component/WebcamVideo.js";
import Login from "./services/login";
import Home from "./pages/home";
import SignUp from "./services/signUp";
import PatientForm from "./component/patientForm.js";
import LandingPage from "./pages/landingPage";
import FetusPage from "./component/fetus";
import About from "./pages/about";
import Footer from './pages/footer.js';
import PatientID from './component/diagnose.js';
import FAQ from './pages/faq';
import { IdentificationProvider } from './component/IdentificationContext';
import FinalResultTest from './component/finalResultTest.js';
import PrivateRoute from './component/PrivateRoute';
import Demo from './component/demoDiagnose';
import DemoPatientForm from './component/demoPatientForm';
import DemoFinalResult from './component/demoFinalResult';
import InsertCode from './component/insertCode';
import RegisterPrivateRoute from './component/RegisterPrivateRoute';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/demoDiagnose" element={<Demo />} />
                    <Route path="/DemoPatientForm" element={<DemoPatientForm />} />
                    <Route path="/DemoFinalResult" element={<DemoFinalResult />} />
                    <Route path="/checkCode" element={<InsertCode />} />
                    <Route path="/register" element={<RegisterPrivateRoute><SignUp /></RegisterPrivateRoute>} />
                    <Route path="/diagnose" element={<PrivateRoute><IdentificationProvider><PatientID /></IdentificationProvider></PrivateRoute>} />
                    <Route path="/fetus" element={<PrivateRoute><IdentificationProvider><FetusPage/></IdentificationProvider></PrivateRoute>} />
                    <Route path="/final-result" element={<PrivateRoute><IdentificationProvider><FinalResultTest/></IdentificationProvider></PrivateRoute>} />
                    <Route path="/PatientForm" element={<PrivateRoute><IdentificationProvider><PatientForm /></IdentificationProvider></PrivateRoute>} />
                    <Route path="/webCamTest" element={<PrivateRoute><IdentificationProvider><WebcamVideo /></IdentificationProvider></PrivateRoute>} />
                </Routes>
            </div>
            <footer className="footer">
               <Footer />
            </footer>
        </Router>
    );
}

export default App;