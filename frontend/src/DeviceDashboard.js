// src/components/DeviceDashboard.js

import React from 'react';

import { useEffect, useState } from "react";

export default function DeviceDashboard({ token }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("http://localhost:5000/device/config", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch config");

        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.error("Error fetching config:", err);
      }
    }

    if (token) fetchConfig();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Device Config</h2>
      {config ? (
        <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(config, null, 2)}</pre>
      ) : (
        <p>Loading config...</p>
      )}
    </div>
  );
}


