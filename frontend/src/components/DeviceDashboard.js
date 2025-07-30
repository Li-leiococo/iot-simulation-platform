import { useEffect, useState } from "react";

export default function DeviceDashboard({ token, onLogout }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("http://localhost:5000/device/config", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">IoT Device Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {!config ? (
        <p>Loading config...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-sm text-gray-500">Device ID</h2>
            <p className="text-lg font-semibold">{config.device_id}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-sm text-gray-500">Sampling Rate</h2>
            <p className="text-lg font-semibold">{config.sampling_rate}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-sm text-gray-500">Status</h2>
            <p className="text-lg font-semibold text-green-600">Connected</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Raw Config</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
}

