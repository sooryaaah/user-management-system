import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditEmployee from "../components/EditEmployee";


const EmployeeDetail = () => {

  const params = useParams()
  const id = params.id
  const token = localStorage.getItem('token')

  const [userData, setUserData] = useState({
  })

  useEffect(() => {


    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/employeedetail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUserData(response.data.data)

        console.log("response", response)
      } catch (error) {
        console.log('error while fetching user', error)
      }
    }
    fetchUser()
  }, [])





  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Employee Details</h2>
        <img
          src={userData.images}
          alt={userData.name}
          className="w-40 h-40 rounded-full object-cover shadow-md border my-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <div className="flex ">
            <p className="text-lg font-medium text-gray-900">{userData.name} </p>
            <EditEmployee/>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-medium text-gray-900">{userData.email}  </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Position</p>
            <p className="text-lg font-medium text-gray-900">{userData.position} </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Department</p>
            <p className="text-lg font-medium text-gray-900">{userData.department} </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Join Date</p>
            <p className="text-lg font-medium text-gray-900">{userData.joinDate} </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span className="inline-block mt-2 mr-4  bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
          <p className="text-gray-600 leading-relaxed">
            John has been part of the development team since early 2024 and is currently
            leading frontend integration projects. He is known for his strong problem-solving skills and dedication.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
