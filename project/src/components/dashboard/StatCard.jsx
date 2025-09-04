// src/components/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon: Icon, change }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 flex items-center gap-4 transition hover:shadow-xl hover:scale-[1.02]">
      {/* Icon */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md">
        <Icon className="w-6 h-6" />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
        {change && (
          <p
            className={`text-xs font-medium ${
              change.includes("+")
                ? "text-emerald-600"
                : change.includes("-")
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
