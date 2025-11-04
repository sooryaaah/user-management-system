import React, { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {

    const [userData, setUserData] = useState({})
    const [task, setTask] = useState([])
    const { id } = useParams()
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
            }
        }
        fetchData()

        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/gettask/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })




                console.log('T response :', response.data.data);

                setTask(response.data.data)

            } catch (error) {
                console.log('error while fetching task:', error || error.message);
                alert(error.message || error)

            }
        }
        fetchTask()

    }, [])
    console.log("task", task);

    const handleStatusUpdate = async (taskId) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/taskstatus/${taskId}`,
                { status: "Completed" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update UI without refresh
            setTask((prev) =>
                prev.map((t) =>
                    t._id === taskId ? { ...t, status: "Completed" } : t
                )
            );

            alert("Task marked as Completed ✅");
        } catch (error) {
            console.log("Error updating status", error);
            alert(error.response?.data?.message || "Failed to update status");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Employee Info Card */}
            <div className="bg-white shadow rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={userData?.images?.secure_url}
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


                <div className="space-y-4">
                    {/* Task Card */}
                    <div className="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto">
                        <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
                        <p className="text-sm text-gray-500 mb-4">Tasks assigned to you</p>

                        {task.length === 0 ? (
                            <p className="text-gray-500 text-sm">No tasks assigned yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {task.map((t) => (
                                    <div
                                        key={t._id}
                                        className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-sm transition"
                                    >
                                        <div>
                                            <h3 className="font-medium text-gray-900">{t.title}</h3>
                                            <p className="text-sm text-gray-600">{t.description || "No description"}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Due: {new Date(t.dueDate).toLocaleDateString()}
                                            </p>
                                            <p
                                                className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${t.status === "Completed"
                                                    ? "bg-green-100 text-green-600"
                                                    : t.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {t.status}
                                            </p>
                                        </div>

                                        <button
                                            className="mt-3 sm:mt-0 flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleStatusUpdate(t._id)}
                                        >
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            Mark Done
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;