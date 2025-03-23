// Author: RuoHan Chen
// Time spent: 3 hours

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="navbar-brand">
          <h1>SWIPE4ME</h1>
          <img src="/logo.svg" alt="Swipe4Me Logo" className="navbar-logo" />
        </Link>

        {isLoggedIn && (
          <ul className="navbar-menu">
            <Link to="/getSwipes" className="navbar-link">
              Get Swipes
            </Link>
            <Link to="/donateSwipes" className="navbar-link">
              Donate Swipes
            </Link>
            <Link to="/transaction" className="transaction">
              Transaction History
            </Link>
          </ul>
        )}

        <div className="navbar-actions">
          {isLoggedIn ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <img
                src="/profile_pic.png"
                alt="User Profile"
                className="profile-image"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-button">
                    Dashboard
                  </Link>
                  <button className="dropdown-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="get-started">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
