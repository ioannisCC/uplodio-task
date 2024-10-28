"use client";

import React, { useState, useEffect } from 'react';

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState('');

  // Fetch a random user from the Flask API based on gender
  const fetchUserFromFlask = async () => {
    if (!gender) {
      alert('Please select a gender');
      return;
    }
    const response = await fetch(`http://127.0.0.1:5000/user?gender=${gender}`);
    const data = await response.json();

    console.log("Fetched user data from Flask:", data);
    
    if (data.error) {
      alert(data.error);
    } else {
      setUser(data);
    }
  };

  const fetchRandomUser = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    setUser(data.results[0]);
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <img 
          src={user.picture.large} 
          alt={`${user.name.first} ${user.name.last}`} 
          className="avatar" 
        />
        <h2 className="title">
          {user.name.title}, {user.name.first} {user.name.last}
        </h2><br></br>
        <p className="info"> <strong><i>Gender:</i></strong></p> <span className='info-value'>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)} </span>
        <p className="info"><strong><i>Email:</i></strong> {user.email}</p>
        <p className="info"><strong><i>Phone:</i></strong> {user.phone}</p>
        <p className="info">
          <strong><i>Location:</i></strong> {user.location.city}, {user.location.state}, {user.location.country}
        </p>
        <p className="info">
          <strong><i>Address:</i></strong> {user.location.street.number} {user.location.street.name}
        </p>
        <p className="info">
          <strong><i>Date of Birth:</i></strong> {new Date(user.dob.date).toLocaleDateString()}
        </p>
        <button className="button" onClick={fetchRandomUser}>
          Fetch New User
        </button><br></br><br></br><br></br><br></br><br></br>
        <div className="gender-selection">
            <label>
                <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                />
                Male
            </label>
            <label>
                <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                />
                Female
            </label>
      </div>
        <button className="button" onClick={() => fetchUserFromFlask(gender)}>Fetch New User Using Flask API</button>
      </div>
    </div>
  );
};

export default UserCard;