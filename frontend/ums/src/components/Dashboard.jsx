import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";


const Dashboard = () => {

  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:4000/getusers', {
        headers : {Authorization : `Bearer ${token}`}
      })
      setTotalEmployees(response.data.length)
    } catch (error) {
      console.log('error while fetching employees', error)
    }
    }
  }, [])
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
          <StatCard title="Total Employees" value={totalEmployees} subtitle="Active employees" />
          <StatCard title="Active Tasks" value="0" subtitle="Pending & in-progress" />
          <StatCard title="Present Today" value="0" subtitle="Out of 0 employees" />
          <StatCard title="Completed Tasks" value="0" subtitle="Total completed" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
