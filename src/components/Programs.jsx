import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import for navigation

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); // Assuming token is stored in localStorage

  // Fetch programs when component mounts or token changes
  useEffect(() => {
    if (token) {
      fetchPrograms();
    }
  }, [token]);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        'https://health-info-system-backend.onrender.com/programs',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Programs fetched:', response.data);
      setPrograms(response.data); // Assuming response.data is an array of programs
    } catch (error) {
      console.error('Error fetching programs:', error.response ? error.response.data : error.message);
    }
  };

  const createProgram = async (e) => {
    e.preventDefault();
    if (!newProgram.trim()) {
      alert("Please enter a program name.");
      return;
    }

    try {
      const response = await axios.post(
        'https://health-info-system-backend.onrender.com/programs',
        { name: newProgram },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Program created:', response.data);
      setNewProgram(''); // Clear the input field after successful creation
      fetchPrograms(); // Refresh the program list
    } catch (error) {
      console.error('Error creating program:', error.response ? error.response.data : error.message);
    }
  };

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

      <h2 className="text-2xl font-bold mb-4">Programs Dashboard</h2>

      {/* Form to create a new program */}
      <form onSubmit={createProgram} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            placeholder="Enter program name"
            className="flex-1 p-2 border rounded"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Program
          </button>
        </div>
      </form>

      {/* List of programs */}
      {programs.length === 0 ? (
        <p className="text-gray-500">No programs found.</p>
      ) : (
        <ul className="space-y-2">
          {programs.map((program) => (
            <li key={program.id} className="p-4 border rounded shadow-sm">
              <p><span className="font-semibold">Program:</span> {program.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Programs;