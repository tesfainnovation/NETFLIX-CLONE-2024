import React, { useState } from "react";
import "./header.css";
import NetflixLogo from "../../assets/images/NetflixLogo.png";

function Header() {
  // State for handling sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="header_outer_container">
      <div className="header_container">
        <div className="header_left">
          <ul>
            {/* Large logo for desktop */}
            <li className="logo-large">
              <img src={NetflixLogo} alt="Netflix Logo" width="120" />
            </li>
            {/* Small logo for mobile - external URL */}
            <li className="logo-small">
              <a href="/" aria-label="Go to homepage">
                <img
                  src="https://tinyurl.com/yc6r8azb"
                  alt="N Logo"
                  width="80"
                />
              </a>
            </li>
            {/* Navigation links */}
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>My List</li>
            <li>Browse by Language</li>
          </ul>
        </div>

        <div className="header_right">
          <ul>
            <li>
              <ion-icon name="search-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="notifications-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="person-circle-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="caret-down-outline"></ion-icon>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <ion-icon
            name={isSidebarOpen ? "close-outline" : "menu-outline"}
          ></ion-icon>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>My List</li>
            <li>Browse by Language</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
