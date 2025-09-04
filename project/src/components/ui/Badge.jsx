// src/components/ui/Badge.jsx
import React from "react";

const Badge = ({ label, variant = "default" }) => {
  const baseClasses =
    "px-2 py-1 rounded-full text-xs font-medium inline-block";

  const variants = {
    default: "bg-dark-300 text-light-300",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    danger: "bg-red-500/20 text-red-400",
    info: "bg-blue-500/20 text-blue-400",
  };

  return (
    <span className={`${baseClasses} ${variants[variant] || variants.default}`}>
      {label}
    </span>
  );
};

export default Badge;
