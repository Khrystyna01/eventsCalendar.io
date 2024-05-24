import React, { useState, useEffect } from 'react';

function DeleteEventPage() {
  const [eventName, setEventName] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/calendar/event/read/');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/calendar/event/${eventName}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setDeleteSuccess(true);
      setTimeout(() => {
        window.location.href = '/personalcabinet'; // перехід на іншу сторінку після успішного видалення
      }, 2000); // чекаємо 2 секунди перед переходом
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="form-container3">
      <h2>Delete Event</h2>
      <select
        id="eventName"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        style={{ width: '150px' }} // Зменшення розміру форми
      >
        <option value="">--Select an event--</option>
        {events.map(event => (
          <option key={event.id} value={event.name}>
            {event.name}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteEvent}>Delete</button>
      {deleteSuccess && (
        <p style={{ color: 'green' }}>Event successfully deleted</p> // Повідомлення про успішне видалення
      )}
    </div>
  );
}

export default DeleteEventPage;
