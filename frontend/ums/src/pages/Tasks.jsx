import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Plus, ClipboardList } from "lucide-react";
import AddTask from "../components/AddTask";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="mx-6 mt-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-gray-500">Manage and assign tasks to employees</p>
          </div>
          <AddTask/>
        </div>

        {/* Task List Section */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Task Card */}
          <div className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Design Landing Page</h3>
              <span className="text-sm text-green-600 font-medium">In Progress</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Assigned to: <span className="font-medium text-gray-800">Rahul</span>
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Due: 14 Oct 2025</span>
              <button className="text-indigo-600 hover:underline">View</button>
            </div>
          </div>

          <div className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Database Backup</h3>
              <span className="text-sm text-yellow-600 font-medium">Pending</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Assigned to: <span className="font-medium text-gray-800">Aisha</span>
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Due: 16 Oct 2025</span>
              <button className="text-indigo-600 hover:underline">View</button>
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
       
      </div>
    </div>
  );
};

export default Tasks;
