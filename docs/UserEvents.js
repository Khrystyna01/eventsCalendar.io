import React, { useState, useEffect } from 'react';
import './App.css';

function UserEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        // Отримуємо всі події
        const response = await fetch('http://127.0.0.1:8000/calendar/event/read/');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserEvents();
  }, []);

  return (
    <div className="user-events-container">
      <ul>
        {events.map(event => (
          <li key={event.id} className="event-item">
            <div className="event-container">
              <p><strong>Title:</strong> {event.name}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              {/* Додаткові поля події */}
            </div>
          </li>
        ))}
      </ul>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UserEvents;



