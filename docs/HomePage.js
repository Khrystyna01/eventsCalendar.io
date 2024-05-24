import React from 'react';
import { Link } from 'react-router-dom';
import calendarImage from './calendar.png';
import './App.css';

function HomePage() {
  return (
    <div className="home-page-container">
      <h1>Welcome</h1>
        <p>Create your own Event Calendar</p>
      <div className="image-container">
        {/* Використання класу .calendar-image для зміни розміру зображення */}
        <img
          src={calendarImage}
          alt="Calendar"
          className="calendar-image" // Додавання класу .calendar-image
        />
      </div>
      <div className="buttons-container">
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
