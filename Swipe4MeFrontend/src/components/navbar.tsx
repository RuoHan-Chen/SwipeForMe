import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth(); 

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    //for logged out set true into false
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>SWIPE4ME</h1>
          <img src="/logo.svg" alt="Swipe4Me Logo" className="navbar-logo" />
        </Link>

        {true && (
          <ul className="navbar-menu">
            <Link to="/buySwipes" className="navbar-link">Buy Swipes</Link>
            <Link to="/tradeSwipes" className="navbar-link">Trade Swipes</Link>
            <Link to="/transaction" className="transaction">Transactions</Link>
          </ul>
        )}

        <div className="navbar-actions">
          {true ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <img
                src="/IMG_6570.png" 
                alt="User Profile"
                className="profile-image"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button className="transaction" > <Link to="/account" className="transaction">Account</Link></button>
                  <button className="transaction" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="get-started">Get Started</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
