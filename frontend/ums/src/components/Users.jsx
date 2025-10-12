import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import Header from './Header';
import AddUser from './AddUser';
import DeleteAction from './DeleteAction';

const Users = () => {
  const [employees, setEmployees] = useState([]);


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
           <div>
          <AddUser/>
        </div>

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
                    <td className="px-4 py-3"> <DeleteAction/> </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
       

      </div>
    </div>
  );
};

export default Users;
