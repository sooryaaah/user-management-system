import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import Header from './Header';
import AddUser from './AddUser';
import { Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:4000/getusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response in fetch data: ", response)

        let employeeData = [];
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].userType == "employee") {
            employeeData.push(response.data.data[i]);
          }
        }

        setEmployees(employeeData);

        // setEmployees(response.data.data)


      } catch (error) {
        console.log('Error while fetching:', error);
      }
    };

    fetchData();
  }, []);
  console.log("employees: ", employees, "\n", typeof employees);

  const deleteUser = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`http://localhost:4000/deleteusers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      setEmployees(prev => prev.filter(emp => emp._id !== id))


    } catch (error) {
      console.log('error in deleteUser', error)
    }
  }





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
            <AddUser />
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
                employees.map((emp) => (
                  <tr key={emp._id} className="border-t hover:bg-gray-50">

                    <td onClick={() => navigate(`/employeedetail/${emp._id}`)} className="px-4 py-3 cursor-pointer flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={emp?.images?.secure_url}
                        alt=""
                      />
                      <span>
                      {emp.name}</span>
                      </td>

                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.position}</td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.joinDate}</td>
                    <td onClick={() => deleteUser(emp._id)} className="px-4 py-3"> <Trash2 size={20} className="text-red-500 cursor-pointer" /> </td>
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
