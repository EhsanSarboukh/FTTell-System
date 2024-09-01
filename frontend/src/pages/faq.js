import React from 'react';
import '../styles/faq.css'; // Import the CSS file for styling
import Header from './header'; // Import the Header component

const FAQ = () => {
  // Set a flag in local storage to restrict access to the registration page
  localStorage.setItem('canAccessRegister', 'false'); 

  return (
    <div className="faq-page">
      <Header />
      <main className="faq-content">
        <section className="hero">
          <div className="overlay">
            <h1>Frequently Asked Questions</h1>
            <p>Welcome to our FAQ page! Here, you'll find answers to common questions about our products,
              <br></br> services, and policies. We're dedicated to providing clear and up-to-date information.</p>
          </div>
        </section>

        <section className="faq-section">
          <details>
            <summary>Is this app a replacement for a professional FTT diagnosis?</summary>
            <p><strong>Yes, the system diagnoses FTT with over 88% accuracy.<br></br> However, it should be noted that regular users (not pediatricians) only have access to the demo version of the system.<br></br> This demo version does not include all the advanced tools available to pediatricians who are connected to the full system.</strong></p>
          </details>
          <details>
            <summary>What kind of data does the app collect?</summary>
            <p><strong>The system stores the child's data, including their ID, weight, and length before birth (fetal data), as well as weights accessible to the doctor for children aged 0 to 60 months.<br></br> Additionally, the mother's data, such as weight, age, and height, must be entered.</strong></p>
          </details>
          <details>
            <summary>How is my data protected?</summary>
            <p><strong>All communications between the app, our server, and our database are secured through encrypted connections.</strong></p>
          </details>
          <details>
            <summary>What should I do if I think my child has the condition FTT?</summary>
            <p><strong>Contact a pediatrician  (Doctor) and request a medical FTT diagnosis.</strong></p>
          </details>
          <details>
            <summary>Is this app appropriate for parents?</summary>
            <p><strong>Yes, parents can perform a demo test to receive an indication of their child's health status.<br></br>To access the demo test, click on the "Diagnose Patient" button on the landing page, followed by the "Demo Diagnose" button.</strong></p>
          </details>
        </section>
      </main>
     
    </div>
  );
};

export default FAQ; // Export the FAQ component
