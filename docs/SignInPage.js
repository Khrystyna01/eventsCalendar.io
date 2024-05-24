import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

let userId2 = null; // Variable to store user ID

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await fetch(`http://127.0.0.1:8000/calendar/user/${formData.email}/`);
      if (!response.ok) {
        throw new Error('User with this email does not exist');
      }

      const userData = await response.json();
      // Assuming the returned user data includes a password field for verification
      if (userData.password !== formData.password) {
        throw new Error('Invalid password');
      }

      userId2 = userData.id; // Store user ID in userId2
      console.log('User ID:', userId2);

      // Redirect to personal cabinet with user ID
      navigate(`/personalcabinet`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container2">
      <h1>Sign In to Event Calendar</h1>
      <form className="form2" onSubmit={handleSubmit}>
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
        <button type="submit" className="button2">Sign In</button>
        {error && <p className="error-message2">{error}</p>}
      </form>
    </div>
  );
}

export { userId2 }; // Export userId2 for external use

export default SignInPage;
