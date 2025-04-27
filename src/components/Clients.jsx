import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Clients.css";
import Logs from './Logs';  // Assuming you have the Logs component.

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({ firstName: '', lastName: '', hudumaNumber: '', age: '' });
  const [showLogs, setShowLogs] = useState(false);  // State to control Logs visibility
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchClients();
    } else {
      navigate("/login");
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
    if (!newClient.firstName.trim() || !newClient.lastName.trim() || !newClient.hudumaNumber.trim() || !newClient.age.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('https://health-info-system-backend.onrender.com/clients', {
        first_name: newClient.firstName,
        last_name: newClient.lastName,
        huduma_number: newClient.hudumaNumber,
        age: newClient.age,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Client created successfully');
      setNewClient({ firstName: '', lastName: '', hudumaNumber: '', age: '' });
      fetchClients();
    } catch (error) {
      console.error('Error creating client:', error.response ? error.response.data : error.message);
    }
  };

  const filteredClients = clients.filter((client) =>
    (`${client.first_name} ${client.last_name}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.huduma_number && client.huduma_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate("/");  
  };

  // Toggle Logs component visibility
  const toggleLogs = () => {
    setShowLogs(!showLogs);
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
            value={newClient.firstName}
            onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
            placeholder="First Name"
            className="clients-div-input"
            required
          />
          <input
            type="text"
            value={newClient.lastName}
            onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
            placeholder="Last Name"
            className="clients-div-input"
            required
          />
          <input
            type="text"
            value={newClient.hudumaNumber}
            onChange={(e) => setNewClient({ ...newClient, hudumaNumber: e.target.value })}
            placeholder="Huduma Number"
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
        placeholder="Search clients by name or huduma number..."
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

      <button onClick={toggleLogs} className="clients-div-toggle-logs-button">
        {showLogs ? 'Close' : 'About me'}
      </button>
      <div className="clients-div-toggle-logs-div" >{showLogs && <Logs />}</div>

      {/* List of clients */}
      {filteredClients.length === 0 ? (
        <p className="clients-div-p">No clients found.</p>
      ) : (
        <ul className="clients-div-ul">
          {filteredClients.map((client) => (
            <li key={client.id} className="clients-div-li">
              <Link to={`/clients/${client.id}`}>
                <p className="clients-div-p">
                  {client.first_name} {client.last_name}
                </p>
              </Link>
              <p>Huduma Number: {client.huduma_number}</p>
              <p>Age: {client.age}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Clients;