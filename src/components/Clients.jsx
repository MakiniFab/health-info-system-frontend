import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Clients.css"

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({ name: '', age: '' });
  const token = localStorage.getItem('token'); // Get token once
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  useEffect(() => {
    if (token) {
      fetchClients();
    } else {
      navigate("/login"); // If no token, redirect to login
    }
  }, [token, navigate]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://health-info-system-backend.onrender.com/clients', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Clients fetched:', response.data);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error.response ? error.response.data : error.message);
    }
  };

  const createClient = async (e) => {
    e.preventDefault();
    if (!newClient.name.trim() || !newClient.age.trim()) {
      alert('Please enter both name and age.');
      return;
    }

    try {
      await axios.post('https://health-info-system-backend.onrender.com/clients', newClient, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Client created successfully');
      setNewClient({ name: '', age: '' }); // Clear the form
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error('Error creating client:', error.response ? error.response.data : error.message);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('Logged out successfully');
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="clients-div">
      {/* Navigation buttons */}
      <div className="clients-div-navigation-buttons">
        <Link to="/clients">
          <button className="clients-div-client-link">Clients</button>
        </Link>
        <Link to="/programs">
          <button className="clients-div-program-link">Programs</button>
        </Link>
      </div>

      <h2 className="clients-div-h2">Clients Dashboard</h2>

      {/* Form to create a new client */}
      <form onSubmit={createClient} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            placeholder="Name"
            className="clients-div-input"
            required
          />
          <input
            type="number"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
            placeholder="Age"
            className="clients-div-input"
            required
          />
          <button type="submit" className="clients-div-button">
            Add Client
          </button>
        </div>
      </form>

      <input
        type="text"
        placeholder="Search clients by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="clients-div-input-search"
      />

      {/* Logout Button */}
      <div className="clients-div-logout">
        <button
          onClick={handleLogout}
          className="clients-div-logout-button"
        >
          Logout
        </button>
      </div>

      {/* List of clients */}
      {filteredClients.length === 0 ? (
        <p className="clients-div-p">No clients found.</p>
      ) : (
        <ul className="clients-div-ul">
          {filteredClients.map((client) => (
            <li key={client.id} className="clients-div-li">
              <Link to={`/clients/${client.id}`}>
                <p className="clients-div-p">{client.name}</p>
              </Link>
              <p>Age: {client.age}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Clients;