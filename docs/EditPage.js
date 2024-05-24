import React, { useState, useEffect } from 'react';
import './App.css'; // Імпорт CSS для стилізації
import { userId } from './SignUpPage';
import { userId2 } from './SignInPage';

function EditUserPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const idToUse = userId || userId2; // Використовуємо перше непорожнє id

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/calendar/user/${idToUse}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const userData = await response.json();
        setFormData({
          full_name: userData.full_name,
          email: userData.email,
          password: ''
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [idToUse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://127.0.0.1:8000/calendar/user/${idToUse}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user information');
      }

      // Redirect to user info page after successful update using window.location.replace
      window.location.replace('/userinfo');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container2">
      <h1>Edit User</h1>
      <div className="form2-container">
        <form className="form2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          /><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          /><br />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
          /><br />
          {/* Move the button inside the form */}
          <button type="submit" className="button2">Save Changes</button>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EditUserPage;
