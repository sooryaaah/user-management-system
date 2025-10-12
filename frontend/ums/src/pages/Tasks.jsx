import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Plus, ClipboardList } from "lucide-react";

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
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} /> Add Task
          </button>
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
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ClipboardList size={20} /> Create New Task
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Select employee</option>
                    <option>Rahul</option>
                    <option>Aisha</option>
                    <option>John</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Task details..."
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
