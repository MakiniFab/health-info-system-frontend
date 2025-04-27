import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import "./Programs.css"
import { useNavigate } from 'react-router-dom';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ name: '', description: '', start_date: '' });
  const [token, setToken] = useState(localStorage.getItem('token')); // Assuming token is stored in localStorage
  const navigate = useNavigate();
  
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
    if (!newProgram.name.trim() || !newProgram.description.trim() || !newProgram.start_date.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        'https://health-info-system-backend.onrender.com/programs',
        newProgram,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Program created:', response.data);
      setNewProgram({ name: '', description: '', start_date: '' }); // Clear the input fields after creation
      fetchPrograms(); // Refresh the program list
    } catch (error) {
      console.error('Error creating program:', error.response ? error.response.data : error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate("/");
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
      <form onSubmit={createProgram} >
        <div className="programs-div-input-div">
          <input
            type="text"
            value={newProgram.name}
            onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
            placeholder="Program Name"
            className="programs-div-input"
            required
          />
          <input
            type="text"
            value={newProgram.description}
            onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
            placeholder="Program Description"
            className="programs-div-input"
            required
          />
          <input
            type="date"
            value={newProgram.start_date}
            onChange={(e) => setNewProgram({ ...newProgram, start_date: e.target.value })}
            className="programs-div-input"
            required
          />
          <button type="submit" className="programs-div-button">
            Add Program
          </button>
        </div>
      </form>

      {/* Logout Button */}
      <div className="clients-div-logout">
        <button
          onClick={handleLogout}
          className="clients-div-logout-button"
        >
          Logout
        </button>
      </div>

      {/* List of programs */}
      {programs.length === 0 ? (
        <p className="programs-div-p">No programs found.</p>
      ) : (
        <ul className="programs-div-ul">
          {programs.map((program) => (
            <li key={program.id} className="programs-div-li">
              <p><span className="programs-div-p">Program Name:</span> {program.name}</p>
              <p><span className="programs-div-p">Description:</span> {program.description}</p>
              <p><span className="programs-div-p">Start Date:</span> {program.start_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Programs;