import React, { useState } from "react";
import axios from "axios";

interface Location {
  latitude: number;
  longitude: number;
}

interface Session {
  status: string;
  location: Location;
  lastUpdated: string;
}

const Dashboard: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionId, setSessionId] = useState<string>("");

  const fetchSession = async () => {
    const res = await axios.get(`http://localhost:5000/api/sessions/${sessionId}`);
    setSession(res.data);
  };

  return (
    <div className="p-4">
      <input
        className="border px-2 py-1"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button
        onClick={fetchSession}
        className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
      >
        Get Status
      </button>

      {session && (
        <div className="mt-4">
          <p>Status: {session.status}</p>
          <p>
            Location: {session.location.latitude}, {session.location.longitude}
          </p>
          <p>Last Updated: {new Date(session.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
