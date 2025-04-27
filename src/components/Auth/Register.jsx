import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css"

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://health-info-system-backend.onrender.com/register',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Registration Success:', response.data);
      alert('Registration successful! You can now login.');
      navigate("/")
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message);
      alert('Registration failed. Try a different username.');
    }
  };

  return (
    <div className="register-div">
      <form onSubmit={handleRegister} className="register-div-form">
        <h2 className="register-div-h2">Doctor Registration</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-div-input"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-div-input"
          required
        />
        
        <button
          type="submit"
          className="register-div-button"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;