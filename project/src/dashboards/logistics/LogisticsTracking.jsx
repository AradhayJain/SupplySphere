import React, { useState } from "react";

export default function LogisticsTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null);

  const mockShipments = {
    "SHP-1001": {
      id: "SHP-1001",
      destination: "Mumbai",
      currentStatus: "In Transit",
      steps: ["Pending Pickup", "In Transit", "Out for Delivery", "Delivered"],
    },
    "SHP-1002": {
      id: "SHP-1002",
      destination: "Delhi",
      currentStatus: "Delivered",
      steps: ["Pending Pickup", "In Transit", "Out for Delivery", "Delivered"],
    },
  };

  const handleTrack = () => {
    setShipment(mockShipments[trackingId] || null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Track Shipment</h1>

      {/* Tracking Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Shipment ID (e.g., SHP-1001)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Track
        </button>
      </div>

      {/* Shipment Details */}
      {shipment ? (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">{shipment.id}</h2>
          <p className="text-gray-600 mb-4">Destination: {shipment.destination}</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {shipment.steps.map((step, index) => {
              const isCompleted =
                shipment.steps.indexOf(shipment.currentStatus) >= index;
              return (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <span
                    className={`text-sm ${
                      isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                  {index < shipment.steps.length - 1 && (
                    <div
                      className={`h-1 w-full ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        trackingId && (
          <p className="text-red-500 font-medium">
            Shipment not found. Please check the ID.
          </p>
        )
      )}
    </div>
  );
}
