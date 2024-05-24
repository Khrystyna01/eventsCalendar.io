import React, { useState } from 'react';

function EditEventForm() {
  const [eventName, setEventName] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/calendar/event/${eventName}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newEventName,
          date: newEventDate
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      // Handle success, such as displaying a success message or redirecting
      console.log('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="edit-event-form-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Event Name:
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Event Date:
          <input
            type="date"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default EditEventForm;
