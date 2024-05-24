import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Імпорт CSS файлу для стилів форми

function CreateEventForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/calendar/event/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      setSuccessMessage('Event created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        // Перенаправлення в особистий кабінет через 2 секунди
        window.location.href = '/personalcabinet';
      }, 2000);
    }
  }, [successMessage]);

  return (
    <div className="form-container7">
      <h2 className="create-event-heading7">Create Event</h2>
      <form className="create-event-form7" onSubmit={handleSubmit}>
        <label className="create-event-label7">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="create-event-input7" />
        </label>
        <br />
        <label className="create-event-label7">
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="create-event-input7" />
        </label>
        <br />
        <button type="submit" className="create-event-button7">Create Event</button>
      </form>
      {successMessage && (
        <p style={{ color: 'green' }} className="success-message7">{successMessage}</p>
      )}
      {/* Додатковий Link до особистого кабінету */}
      <Link to="/personalcabinet" className="link-to-cabinet"></Link>
    </div>
  );
}

export default CreateEventForm;
