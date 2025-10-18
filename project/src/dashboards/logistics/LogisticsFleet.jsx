import React, { useState } from "react";

export default function LogisticsFleet() {
  const [vehicles, setVehicles] = useState([
    {
      id: "VH-101",
      type: "Truck",
      status: "Active",
      lastService: "2025-08-15",
    },
    {
      id: "VH-102",
      type: "Van",
      status: "Under Maintenance",
      lastService: "2025-07-28",
    },
    {
      id: "VH-103",
      type: "Bike",
      status: "Active",
      lastService: "2025-09-01",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    id: "",
    type: "",
    status: "Active",
    lastService: "",
  });

  const handleAddVehicle = () => {
    if (!newVehicle.id || !newVehicle.type) return;
    setVehicles([...vehicles, newVehicle]);
    setNewVehicle({ id: "", type: "", status: "Active", lastService: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Fleet Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
        >
          {showForm ? "Cancel" : "Add Vehicle"}
        </button>
      </div>

      {/* Add Vehicle Form */}
      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">Add New Vehicle</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Vehicle ID"
              value={newVehicle.id}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, id: e.target.value })
              }
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Type (Truck/Van/Bike)"
              value={newVehicle.type}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, type: e.target.value })
              }
              className="p-2 border rounded-lg"
            />
            <select
              value={newVehicle.status}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, status: e.target.value })
              }
              className="p-2 border rounded-lg"
            >
              <option>Active</option>
              <option>Under Maintenance</option>
              <option>Out of Service</option>
            </select>
            <input
              type="date"
              value={newVehicle.lastService}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, lastService: e.target.value })
              }
              className="p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleAddVehicle}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            Save Vehicle
          </button>
        </div>
      )}

      {/* Fleet Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-2xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Vehicle ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Service</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{vehicle.id}</td>
                <td className="p-3">{vehicle.type}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : vehicle.status === "Under Maintenance"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="p-3">{vehicle.lastService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
