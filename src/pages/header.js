import React, { useState, useEffect } from "react";
import styles from '../styles/header.module.css';
import { CSSTransition } from "react-transition-group";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
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
