// src/components/DeviceDashboard.js

import React from 'react';

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


export default function DeviceDashboard({ token }) {
  const [config, setConfig] = useState(null);
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

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
  
  // Fetch live weather
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("http://localhost:5000/api/weather/latest");
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
  async function fetchHistory() {
    try {
      const res = await fetch("http://localhost:5000/api/weather/history?device_id=public-weather&limit=20");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching weather history:", err);
    }
  }

  fetchHistory();
}, []);



  return (
  <div className="p-4 space-y-6">
     <div>
      <h2 className="text-xl font-semibold mb-2">Device Config</h2>
      {config ? (
        <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(config, null, 2)}</pre>
      ) : (
        <p>Loading config...</p>
      )}
    </div>
    <div>
        <h2 className="text-xl font-semibold mb-2">🌤 Live Weather Data</h2>
        {weather ? (
          <div className="bg-blue-50 p-4 rounded shadow text-sm">
            <p><strong>Location:</strong> {weather.location}</p>
            <p><strong>Temperature:</strong> {weather.temperature}°F</p>
            <p><strong>Humidity:</strong> {weather.humidity}%</p>
            <p><strong>Condition:</strong> {weather.condition}</p>
            <p className="text-gray-500 text-xs">Last updated: {new Date(weather.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
      <div>
  <h2 className="text-xl font-semibold mb-2 mt-8">📈 Temperature Trend</h2>
  {history.length > 0 ? (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
          minTickGap={30}
        />
        <YAxis unit="°F" />
        <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleString()} />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <p>Loading temperature history...</p>
  )}
</div>

       </div>
  );
}


