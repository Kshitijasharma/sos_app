import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EscortSession from "./components/EscortSession";
import Dashboard from "./components/Dashboard";
import Emergency from "./components/Emergency";

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">Escort Session</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<EscortSession />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;