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
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <h1>SWIPE4ME</h1>
            <img src="/logo.svg" alt="Swipe4Me Logo" className="navbar-logo" />
          </Link>

          {true && (
              <ul className="navbar-menu">
                <Link to="/buySwipes" className="navbar-link">Trade Swipes</Link>
                <Link to="/donateSwipes" className="navbar-link">Donate Swipes</Link>
                <Link to="/transaction" className="transaction">Transaction History</Link>
              </ul>
          )}

          <div className="navbar-actions">
            {true ? (
                <div className="profile-dropdown-container" ref={dropdownRef}>
                  <img
                      src="/profile_pic.png"
                      alt="User Profile"
                      className="profile-image"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                  />

                  {dropdownOpen && (
                      <div className="dropdown-menu">
                        <Link to="/account" className="dropdown-button">Account</Link>
                        <button className="dropdown-button" onClick={logout}>Logout</button>
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
