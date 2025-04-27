import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import "./Programs.css"

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
    <div className="programs-div">
      {/* Navigation buttons */}
      <div className="programs-div-links">
        <Link to="/clients">
          <button className="programs-div-client-link">Clients</button>
        </Link>
        <Link to="/programs">
          <button className="programs-div-program-link">Programs</button>
        </Link>
      </div>

      <h2 className="programs-div-h2">Programs Dashboard</h2>

      {/* Form to create a new program */}
      <form onSubmit={createProgram} className="mb-8">
        <div className="programs-div-input-div">
          <input
            type="text"
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            placeholder="Enter program name"
            className="programs-div-input"
            required
          />
          <button type="submit" className="programs-div-button">
            Add Program
          </button>
        </div>
      </form>

      {/* List of programs */}
      {programs.length === 0 ? (
        <p className="programs-div-p">No programs found.</p>
      ) : (
        <ul className="programs-div-ul">
          {programs.map((program) => (
            <li key={program.id} className="programs-div-li">
              <p><span className="programs-div-p">Program:</span> {program.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Programs;