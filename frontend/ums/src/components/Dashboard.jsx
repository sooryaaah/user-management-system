import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="mx-6 mt-8"> 
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welome to your admin dashboard</p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Employees" value="0" subtitle="Active employees" />
          <StatCard title="Active Tasks" value="0" subtitle="Pending & in-progress" />
          <StatCard title="Present Today" value="0" subtitle="Out of 0 employees" />
          <StatCard title="Completed Tasks" value="0" subtitle="Total completed" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
