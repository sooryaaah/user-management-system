import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddUser from "./AddUser";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getusers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const employeeData = response.data.data.filter(
          (user) => user.userType === "employee"
        );
        setEmployees(employeeData);
      } catch (error) {
        console.log("Error while fetching:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteusers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 mt-20 md:mt-8 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Employees</h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage your employee records
            </p>
          </div>
          <AddUser />
        </div>

        {/* Employee Table */}
        <div className="px-4 sm:px-6 mt-6">
          {/* scroll container */}
          <div className="overflow-x-auto w-full">
            {/* this inline-block forces the inner content to keep its width and trigger scrolling */}
            <div className="inline-block min-w-[900px] md:w-full align-middle">
              <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm md:text-base">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm">
                  <tr>
                    <th className="py-3 px-4 border-b whitespace-nowrap">Name</th>
                    <th className="py-3 px-4 border-b whitespace-nowrap">Email</th>
                    <th className="py-3 px-4 border-b whitespace-nowrap">Position</th>
                    <th className="py-3 px-4 border-b whitespace-nowrap">Department</th>
                    <th className="py-3 px-4 border-b whitespace-nowrap">Join Date</th>
                    <th className="py-3 px-4 border-b whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-6 text-sm md:text-base"
                      >
                        No employees found. Add your first employee to get started.
                      </td>
                    </tr>
                  ) : (
                    employees.map((emp) => (
                      <tr
                        key={emp._id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td
                          onClick={() => navigate(`/employeedetail/${emp._id}`)}
                          className="px-4 py-3 cursor-pointer flex items-center gap-3 whitespace-nowrap"
                        >
                          <img
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                            src={emp?.images?.secure_url}
                            alt=""
                          />
                          <span className="truncate">{emp.name}</span>
                        </td>

                        <td className="px-4 py-3 truncate whitespace-nowrap">{emp.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{emp.position}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{emp.department}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{emp.joinDate}</td>
                        <td
                          onClick={() => deleteUser(emp._id)}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          <Trash2
                            size={18}
                            className="text-red-500 cursor-pointer hover:text-red-600 transition"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Users;
