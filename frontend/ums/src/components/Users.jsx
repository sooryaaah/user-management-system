import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import Header from './Header';

const Users = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    joinDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/getusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data); // Make sure your API returns an array
      } catch (error) {
        console.log('Error while fetching:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    if (!formData.name || !formData.email) {
      alert('Name and Email are required.');
      return;
    }

    const newEmployee = { ...formData };
    setEmployees((prev) => [...prev, newEmployee]);

    // Reset and close modal
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      joinDate: '',
    });
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* Page Header */}
        <div className="flex justify-between items-center px-6 mt-8">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-gray-500">Manage your employee records</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            + Add Employee
          </button>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto px-6 mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Position</th>
                <th className="py-3 px-4 border-b">Department</th>
                <th className="py-3 px-4 border-b">Join Date</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No employees found. Add your first employee to get started.
                  </td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.position}</td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.joinDate}</td>
                    <td className="px-4 py-3">Edit | Delete</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Employee Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg transform transition-transform duration-900 ease-in-out scale-100 opacity-100">

              <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
