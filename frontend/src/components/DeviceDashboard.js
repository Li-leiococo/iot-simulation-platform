// src/components/DeviceDashboard.js

import React from 'react';

function DeviceDashboard({ onLogout }) {
  const mockDeviceData = {
    deviceId: 'sensor-123',
    temperature: '72.3°F',
    humidity: '48%',
    status: 'Connected',
    lastUpdated: new Date().toLocaleString(),
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Device Dashboard</h2>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-lg">
        <div className="bg-blue-100 p-4 rounded">
          <p className="font-semibold">Device ID:</p>
          <p>{mockDeviceData.deviceId}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="font-semibold">Status:</p>
          <p>{mockDeviceData.status}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p className="font-semibold">Temperature:</p>
          <p>{mockDeviceData.temperature}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <p className="font-semibold">Humidity:</p>
          <p>{mockDeviceData.humidity}</p>
        </div>
        <div className="col-span-2 bg-gray-100 p-4 rounded">
          <p className="font-semibold">Last Updated:</p>
          <p>{mockDeviceData.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}

export default DeviceDashboard;

