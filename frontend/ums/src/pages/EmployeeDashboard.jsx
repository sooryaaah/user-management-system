import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, ClipboardList, User } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import AdminIcon from "../components/AdminIcon";
import EditEmployee from "../components/EditEmployee";

const COLORS = ["#f87171", "#facc15", "#4ade80"]; // Pending, In Progress, Completed

const EmployeeDashboard = () => {
    const [userData, setUserData] = useState({});
    const [tasks, setTasks] = useState([]);
    const { id } = useParams();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(
                    `http://localhost:4000/employeedetail/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserData(userRes.data.data);

                const taskRes = await axios.get(
                    `http://localhost:4000/gettask/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTasks(taskRes.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert(error.message || "Failed to load data");
            }
        };
        fetchData();
    }, [id, token]);

    const handleStatusUpdate = async (taskId) => {
        try {
            await axios.put(
                `http://localhost:4000/taskstatus/${taskId}`,
                { status: "Completed" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks((prev) =>
                prev.map((t) =>
                    t._id === taskId ? { ...t, status: "Completed" } : t
                )
            );
            alert("✅ Task marked as Completed!");
        } catch (error) {
            console.log("Error updating status:", error);
        }
    };

    const taskStats = {
        total: tasks.length,
        pending: tasks.filter((t) => t.status === "Pending").length,
        inProgress: tasks.filter((t) => t.status === "In Progress").length,
        completed: tasks.filter((t) => t.status === "Completed").length,
    };

    const pieData = [
        { name: "Pending", value: taskStats.pending },
        { name: "In Progress", value: taskStats.inProgress },
        { name: "Completed", value: taskStats.completed },
    ];

    return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-6">
    {/* Top Right Icon */}
    <div className="flex justify-end mb-4">
      <AdminIcon />
    </div>

    {/* Profile Header */}
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={userData?.images?.secure_url}
          alt="profile"
          className="w-20 h-20 rounded-full border-4 border-white object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{userData?.name}</h2>
          <p className="opacity-90">{userData?.position}</p>
          <p className="text-sm opacity-70">{userData?.email}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-end">
        <button className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-4 py-1.5 rounded-full font-medium hover:bg-indigo-50 transition text-sm sm:text-base">
          <EditEmployee id={id} />
          <span>Edit</span>
        </button>
        <span className="bg-white text-indigo-600 px-4 py-1.5 rounded-full font-medium shadow text-sm sm:text-base text-center">
          Active
        </span>
      </div>
    </div>

    {/* Stats Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
      <StatCard icon={<User className="text-indigo-600" />} title="Position" value={userData?.position || "—"} />
      <StatCard icon={<ClipboardList className="text-purple-600" />} title="Total Tasks" value={taskStats.total} />
      <StatCard icon={<Clock className="text-yellow-500" />} title="Pending Tasks" value={taskStats.pending + taskStats.inProgress} />
      <StatCard icon={<CheckCircle className="text-green-600" />} title="Completed" value={taskStats.completed} />
    </div>

    {/* Task Breakdown + Task List */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Pie Chart Section */}
      <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-4">Task Breakdown</h2>
        {taskStats.total === 0 ? (
          <p className="text-gray-500 text-sm text-center">No tasks assigned yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Task List */}
      <div className="lg:col-span-2 bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">My Tasks</h2>
        <p className="text-sm text-gray-500 mb-4">Review and update your assigned tasks.</p>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No tasks assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((t) => (
              <div
                key={t._id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{t.title}</h3>
                  <p className="text-sm text-gray-600">{t.description || "No description"}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(t.dueDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${
                      t.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : t.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {t.status}
                  </p>
                </div>

                {t.status !== "Completed" && (
                  <button
                    className="mt-3 sm:mt-0 flex items-center justify-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-green-50 transition"
                    onClick={() => handleStatusUpdate(t._id)}
                  >
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Mark Done
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

};

// StatCard Component
const StatCard = ({ icon, title, value }) => (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex items-center gap-4">
        <div className="bg-gray-100 p-3 rounded-xl">{icon}</div>
        <div>
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

export default EmployeeDashboard;
