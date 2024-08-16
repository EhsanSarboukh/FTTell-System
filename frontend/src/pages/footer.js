import React from 'react';
import styles from '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope  } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p> FTTell</p>
        <ul className="footer-links">
    
          <li><a href="/about">About Us</a></li>
          
          <li><a href="/FAQ">FAQ</a></li>
          <li><a href="/">Home</a></li>
          <li><FontAwesomeIcon icon={faPhone} /> Contact us: 0527042828   </li> 
          <li><FontAwesomeIcon  icon={faEnvelope} /> FTTell.diagnose@gmail.com</li>

         
        </ul>
      </div>
    </footer>
  );
}

export default Footer;