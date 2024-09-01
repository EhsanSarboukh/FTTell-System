import React, { useState, useEffect } from "react";
import styles from '../styles/header.module.css'; // Import the CSS module for styling
import { CSSTransition } from "react-transition-group"; // Import CSSTransition for animations
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false); // State to manage navigation visibility
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track if the screen is small
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [isDropdownVisible, setDropdownVisibility] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)"); // Media query to detect screen size
    mediaQuery.addListener(handleMediaQueryChange); // Listen for changes in screen size
    handleMediaQueryChange(mediaQuery); // Initial check of the screen size

    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set the logged-in state if a token is found
    }

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange); // Cleanup the listener on component unmount
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true); // Set small screen state if media query matches
    } else {
      setIsSmallScreen(false); // Reset small screen state if media query doesn't match
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible); // Toggle the navigation visibility state
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage on logout
    setIsLoggedIn(false); // Update the logged-in state
    navigate('/'); // Navigate to the home page after logout
  };

  return (
    <header className={styles.Header}>
      <img src={require("../images/logoOption2.png")} className={styles.Logo} alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames={{
          enter: styles.NavAnimationEnter,
          enterActive: styles.NavAnimationEnterActive,
          exit: styles.NavAnimationExit,
          exitActive: styles.NavAnimationExitActive
        }}
        unmountOnExit
      >
        <nav className={`${styles.Nav} ${isNavVisible ? styles.active : ''}`}>
          <a href="/">Home</a>
          <a href="/faq">FAQ</a>
          <div
            className={styles.Dropdown}
            onMouseEnter={() => setDropdownVisibility(true)}
            onMouseLeave={() => setDropdownVisibility(false)}
          >
            <a href="/about">About</a>
            {isDropdownVisible && (
              <div className={styles.DropdownContent}>
                <a href="/about#meet-team">Meet The Team</a>
                <a href="/about">About FTTell</a>
                <a href="/about#impact-reports">Important Studies</a>
              </div>
            )}
          </div>
        </nav>
      </CSSTransition>
      {isLoggedIn && (
        <button onClick={handleLogout} className={styles.LogoutButton}>Logout</button>
      )}
      <button onClick={toggleNav} className={styles.Burger}>
        ☰
      </button>
    </header>
  );
}
