import React from "react";
import { Package, Truck, MapPin } from "lucide-react";

export default function LogisticsHome() {
  const recentShipments = [
    { id: "SHP-1001", status: "In Transit", destination: "Mumbai" },
    { id: "SHP-1002", status: "Delivered", destination: "Delhi" },
    { id: "SHP-1003", status: "Pending Pickup", destination: "Bangalore" },
  ];

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow mb-6">
        <h1 className="text-3xl font-bold">Logistics Dashboard</h1>
        <p className="mt-2 text-white/90">
          Manage shipments, track deliveries, and optimize your fleet in real time.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6 flex items-center">
          <Package className="w-10 h-10 text-orange-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">View Shipments</h2>
            <p className="text-sm text-gray-500">Track all active shipments</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex items-center">
          <Truck className="w-10 h-10 text-red-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Manage Fleet</h2>
            <p className="text-sm text-gray-500">Oversee all vehicles</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex items-center">
          <MapPin className="w-10 h-10 text-green-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Track Delivery</h2>
            <p className="text-sm text-gray-500">Check live delivery status</p>
          </div>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
        <ul className="space-y-3">
          {recentShipments.map((shipment) => (
            <li
              key={shipment.id}
              className="flex justify-between items-center border-b last:border-b-0 pb-3"
            >
              <span className="font-medium">{shipment.id}</span>
              <span className="text-gray-500">{shipment.destination}</span>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
