import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import "./ClientProfile.css"

const ClientProfile = () => {
  const { clientId } = useParams(); // Get clientId from the URL
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [outcome, setOutcome] = useState('');
  const [notes, setNotes] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token from localStorage

  useEffect(() => {
    fetchClientProfile();
    fetchPrograms(); // Fetch list of programs
  }, [clientId]); // Re-fetch when clientId changes

  const fetchClientProfile = async () => {
    try {
      const response = await axios.get(
        `https://health-info-system-backend.onrender.com/clients/${clientId}`, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClient(response.data);
    } catch (error) {
      console.error('Error fetching client profile:', error.response ? error.response.data : error.message);
    }
  };

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
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error.response ? error.response.data : error.message);
    }
  };

  const enrollClientInProgram = async () => {
    if (!selectedProgram) {
      alert('Please select a program to enroll the client in.');
      return;
    }

    try {
      const response = await axios.post(
        'https://health-info-system-backend.onrender.com/enroll', 
        {
          client_id: clientId,
          program_id: selectedProgram,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Client enrolled in program:', response.data);
      fetchClientProfile();
    } catch (error) {
      console.error('Error enrolling client:', error.response ? error.response.data : error.message);
    }
  };

  const addOutcome = async () => {
    if (!outcome || !notes || !selectedProgram) {
      alert('Please provide the outcome, notes, and select a program.');
      return;
    }

    try {
      const response = await axios.post(
        'https://health-info-system-backend.onrender.com/outcomes', 
        {
          client_id: clientId,
          program_id: selectedProgram,
          outcome: outcome,
          notes: notes,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Outcome added:', response.data);
      fetchClientProfile();
    } catch (error) {
      console.error('Error adding outcome:', error.response ? error.response.data : error.message);
    }
  };

  if (!client) {
    return <p>Loading client profile...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate("/");
  };

  return (
    <div className='profile-div' >
      <h2 className='profile-div-h2' >Client Profile</h2>
      <div className='profile-div-profile-details' >
        <p className='profile-div-name' ><strong>Name:</strong> {client.name}</p>
        <p className='profile-div-age' ><strong>Age:</strong> {client.age}</p>
        <p className='profile-div-programs' ><strong>Programs:</strong> 
          {client.programs.length > 0 ? client.programs.join(", ") : "No programs assigned"}
        </p>
        <div className='profile-div-outcomes' ><strong>Outcomes:</strong> 
          {client.outcomes.length > 0 ? (
            client.outcomes.map((outcome, index) => (
              <div key={index} className='profile-div-outcome-list'>
                <div className='profile-div-outcome' ><strong>Outcome:</strong> {outcome.outcome}</div>
                <div className='profile-div-note' ><strong>Notes:</strong> {outcome.notes}</div>
              </div>
            ))
          ) : "No outcomes available"}
        </div>
      </div>

      <h3 className='profile-div-h3' >Enroll in a Program</h3>
      <div className='profile-div-enroll' >
        <label htmlFor="programSelect" className='profile-div-label'>Select Program:</label>
        <select
          id="programSelect"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className='profile-div-select'
        >
          <option value=""  className='profile-div-option'>Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id} className='profile-div-option'>
              {program.name}
            </option>
          ))}
        </select>
        <button className='profile-div-enroll-button' onClick={enrollClientInProgram}>Enroll</button>
      </div>

      <h3 className='profile-div-outcome-h3' >Add Outcome</h3>
      <div className='profile-div-outcome-div' >
        <label htmlFor="outcomeInput" className='profile-div-outcome-div-label'>Outcome:</label>
        <input
          type="text"
          id="outcomeInput"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          className='profile-div-outcome-div-input'
        />

        <label htmlFor="notesInput" className='profile-div-outcome-div-label'>Notes:</label>
        <textarea
          id="notesInput"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className='profile-div-outcome-div-textarea'
        ></textarea>

        <button className='profile-div-outcome-div-button' onClick={addOutcome}>Add Outcome</button>
      </div>

      <div className="clients-div-logout">
        <button
          onClick={handleLogout}
          className="clients-div-logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientProfile;