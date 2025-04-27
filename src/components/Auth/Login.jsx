import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Handle input changes for both username and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://health-info-system-backend.onrender.com/login',
        credentials,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = response.data.access_token;
      const username = credentials.username; // Capture the username from the credentials

      // Store token and username in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);  // Save username to localStorage

      alert('Login successful!');
      navigate("/clients");
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed. Check your username and password.');
    }
  };

  return (
    <div className="login-div">
      <form onSubmit={handleLogin} className="login-div-form">
        <h2 className="login-div-h2">Doctor Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="login-div-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="login-div-input"
          required
        />

        <button
          type="submit"
          className="login-div-button"
        >
          Login
        </button>

        {/* Link to the registration page */}
        <p className="login-div-p">
          Not registered yet?{' '}
          <Link to="/register" className="login-div-link">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;