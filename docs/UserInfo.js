// UserInfo.js

import React, { useState, useEffect } from 'react';
import './App.css'; // Імпорт CSS для стилізації
import { userId } from './SignUpPage';
import { userId2 } from './SignInPage';
import { useNavigate } from 'react-router-dom';

let idToUse = userId; // За замовчуванням використовуємо userId

if (!userId) {
  idToUse = userId2;
}

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const idToFetch = userId || userId2; // Вибираємо правильний ID для завантаження інформації
        const response = await fetch(`http://127.0.0.1:8000/calendar/user/${idToFetch}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const userData = await response.json();
        setUserInfo(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
    if (confirmDelete) {
      const idToDelete = userId || userId2;
      try {
        const response = await fetch(`http://127.0.0.1:8000/calendar/user/${idToDelete}/delete/`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete profile');
        }
        console.log('Profile deleted successfully');
        navigate('/');
      } catch (error) {
        setError(error.message);
      }
    }
  };

return (
    <div className="form-container3">
      <h2>User Information</h2>
      {userInfo ? (
        <div className="form3">
          <p><strong>Full Name:</strong> {userInfo.full_name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      {error && <p className="error-message4">{error}</p>}
      <div className="button-container">
        <button onClick={handleEditProfile} className="edit-button">Edit Profile</button>
        <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
      </div>
    </div>
  );
}

export default UserInfo;



