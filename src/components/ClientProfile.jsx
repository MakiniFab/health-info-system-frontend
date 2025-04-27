import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Use to get dynamic params from the URL

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

  return (
    <div>
      <h2>Client Profile</h2>
      <div>
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Age:</strong> {client.age}</p>
        <p><strong>Programs:</strong> 
          {client.programs.length > 0 ? client.programs.join(", ") : "No programs assigned"}
        </p>
        <div><strong>Outcomes:</strong> 
          {client.outcomes.length > 0 ? (
            client.outcomes.map((outcome, index) => (
              <div key={index}>
                <div><strong>Outcome:</strong> {outcome.outcome}</div>
                <div><strong>Notes:</strong> {outcome.notes}</div>
              </div>
            ))
          ) : "No outcomes available"}
        </div>
      </div>

      <h3>Enroll in a Program</h3>
      <div>
        <label htmlFor="programSelect">Select Program:</label>
        <select
          id="programSelect"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
        <button onClick={enrollClientInProgram}>Enroll</button>
      </div>

      <h3>Add Outcome</h3>
      <div>
        <label htmlFor="outcomeInput">Outcome:</label>
        <input
          type="text"
          id="outcomeInput"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />

        <label htmlFor="notesInput">Notes:</label>
        <textarea
          id="notesInput"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button onClick={addOutcome}>Add Outcome</button>
      </div>
    </div>
  );
};

export default ClientProfile;