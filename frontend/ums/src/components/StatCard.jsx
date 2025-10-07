import React from "react";

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm flex flex-col">
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-3xl font-bold  mt-1">{value}</p>
      <span className="text-xs text-gray-600 mt-1">{subtitle}</span>
    </div>
  );
};

export default StatCard;
