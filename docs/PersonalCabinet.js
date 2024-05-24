import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserEvents from "./UserEvents";
import image from './my_image.png';
import './App.css'; // Імпорт CSS файлу

function PersonalCabinet({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="container">
      <header className="top-bar6">
        <div className="user-profile6" onClick={toggleDropdown}>
          <span className="your-profile-text">User Profile</span>
          {showDropdown && (
            <div className="dropdown-menu6">
              <ul>
                <li><Link to="/userinfo">Information</Link></li>
                <li><Link to="/">Exit</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="image-container6">
        <img
          src={image}
          alt="my_image"
          className="calendar-image6 smaller-image"
        />
      </div>
      <div className="events-container6">
        <h2 className="events-title">All Events</h2>
        <div className="event-item-container6">
          <UserEvents />
        </div>
      </div>
      <div className="actions-container6">
        <Link to="/createevent">
          <button className="action-btn">Create New Event</button>
        </Link>

        <Link to="/deleteevent">
          <button className="action-btn">Delete Event</button>
        </Link>
      </div>
    </div>
  );
}

export default PersonalCabinet;
