import React, { useState } from "react";

export default function LogisticsShipments() {
  const [search, setSearch] = useState("");

  const shipments = [
    {
      id: "SHP-1001",
      destination: "Mumbai",
      status: "In Transit",
      eta: "2025-09-07",
    },
    {
      id: "SHP-1002",
      destination: "Delhi",
      status: "Delivered",
      eta: "2025-09-03",
    },
    {
      id: "SHP-1003",
      destination: "Bangalore",
      status: "Pending Pickup",
      eta: "2025-09-08",
    },
  ];

  const filteredShipments = shipments.filter(
    (s) =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Shipments</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search shipments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 p-2 border rounded-lg mb-4"
      />

      {/* Shipments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-2xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Shipment ID</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Status</th>
              <th className="p-3">ETA</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{shipment.id}</td>
                <td className="p-3">{shipment.destination}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      shipment.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : shipment.status === "In Transit"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td className="p-3">{shipment.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
