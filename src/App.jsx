import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Clients from './components/Clients';
import Programs from './components/Programs';
import ClientProfile from './components/ClientProfile';
import Logs from './components/Logs';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/clients/:clientId" element={<ClientProfile />} />
          <Route path="/logs" element={<Logs/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;