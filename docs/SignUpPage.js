import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

let userId = null; // Змінна для збереження ID користувача

function SignUpPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/calendar/user/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create user');
      }

      const result = await response.json();
      console.log('User created successfully:', result);

      // Set the user ID
      userId = result.id;
      console.log('User ID:', result.id); // Виведення у консоль

      // Clear form data on successful submission
      setFormData({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect to personal cabinet
      navigate(`/personalcabinet`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container2">
      <h1>Sign up for Event Calendar</h1>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        /><br />
        <button type="submit" className="button2">Sign Up</button>
        {error && <p className="error-message2">{error}</p>}
      </form>

    </div>
  );
}

export { userId }; // Експортуємо userId для зовнішнього використання
export default SignUpPage;
