import React, { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {

    const [userData, setUserData] = useState(null)
    const [task, setTask] = useState(null)
    const {id} = useParams()
    console.log("id:", id);
    
    const token = localStorage.getItem("token");
    useEffect(() => {
         const fetchData = async () => {
        try {
           
                const response = await axios.get(`http://localhost:4000/employeedetail/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log('response:', response);
                
                setUserData(response.data.data)
            }
         catch (error) {
            console.log('error while fetching', error)
            alert(error)
        }}
        fetchData()

        const fetchTask = async () => {
            try {
               const response = await axios.get(`http://localhost:4000/gettask/${id}`,{
                    headers: { Authorization: `Bearer ${token}` }
                }) 
             
                
                

                console.log('T response :', response);
                
                setTask(response.data.data)
            } catch (error) {
                console.log('error while fetching task:', error || error.message);
                alert(error.message || error)
                
            }
        }
        fetchTask()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Employee Info Card */}
            <div className="bg-white shadow rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="profile"
                            className="w-20 h-20 rounded-full object-cover border"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{userData?.name} </h2>
                            <p className="text-gray-500 text-sm">{userData?.position} </p>
                        </div>
                    </div>

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Active
                    </span>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm text-gray-700">
                    <div>
                        <p className="font-medium text-gray-900 mb-2">Profile</p>
                        <p>👤 {userData?.name} </p>
                        <p>📧 {userData?.email} </p>
                        <p>🏢 {userData?.position} </p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 mb-2">Work Details</p>
                        <p>🏢 Department: {userData?.department} </p>
                        <p>📅 Join Date: {new Date(userData?.joinDate).toLocaleDateString()} </p>
                        <p>👥 Team: --</p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 mb-2">Contact</p>
                        <p>📧 {userData?.email} </p>
                        <p>🆔 {userData?._id} </p>
                    </div>
                </div>
            </div>

            {/* Task Section */}
            <div className="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
                <p className="text-sm text-gray-500 mb-4">Tasks assigned to you</p>

                <div className="space-y-4">
                    {/* Task Card */}
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Submit Report</h3>
                            <p className="text-xs text-gray-500">Due: 2025-11-12</p>
                        </div>
                        <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm hover:bg-gray-100">
                            <CheckCircle className="w-4 h-4" /> Mark Done
                        </button>
                    </div>

                    {/* Task Card */}
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Attend Team Meeting</h3>
                            <p className="text-xs text-gray-500">Due: 2025-11-15</p>
                        </div>
                        <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm cursor-not-allowed">
                            <Clock className="w-4 h-4" /> Completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;