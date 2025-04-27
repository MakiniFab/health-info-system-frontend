import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle the fetch operation
  const token = localStorage.getItem('token'); // Get token from localStorage
  const username = localStorage.getItem('username'); // Get username (doctor's name) from localStorage
  const navigate = useNavigate(); // Use navigate hook to handle redirects

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    } else {
      fetchLogs(); // Fetch logs when component mounts
    }
  }, [token, navigate]);

  // Fetch all logs from the backend
  const fetchLogs = async () => {
    try {
      const response = await axios.get('https://health-info-system-backend.onrender.com/logs', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter logs based on the doctor's username (the currently logged-in user)
      const filteredLogs = response.data.filter(log => log.doctor === username);
      
      setLogs(filteredLogs); // Set filtered logs in state
      setLoading(false); // Set loading to false once logs are fetched
    } catch (error) {
      console.error('Error fetching logs:', error.response ? error.response.data : error.message);
      setLoading(false); // Stop loading if there’s an error
    }
  };

  // Display loading message while fetching
  if (loading) {
    return <div className="text-center p-6">Loading logs...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Logs</h2>

      {/* Display logs */}
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs available for your account.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li key={index} className="p-4 border rounded shadow-sm">
              <p><strong>Action:</strong> {log.action}</p>
              <p><strong>Doctor:</strong> {log.doctor}</p>
              <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Logs;