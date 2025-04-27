import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import for navigation

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({ name: '', age: '' });
  const token = localStorage.getItem('token'); // Get token once

  useEffect(() => {
    if (token) {
      fetchClients();
    }
  }, [token]);

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Navigation buttons */}
      <div className="flex space-x-4 mb-6">
        <Link to="/clients">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Clients</button>
        </Link>
        <Link to="/programs">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Programs</button>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Clients Dashboard</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search clients by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />

      {/* Form to create a new client */}
      <form onSubmit={createClient} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            placeholder="Name"
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="number"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
            placeholder="Age"
            className="flex-1 p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Client
          </button>
        </div>
      </form>

      {/* List of clients */}
      {filteredClients.length === 0 ? (
        <p className="text-gray-500">No clients found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredClients.map((client) => (
            <li key={client.id} className="p-4 border rounded shadow-sm">
              <Link to={`/clients/${client.id}`}>
                <p className="font-semibold">{client.name}</p>
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