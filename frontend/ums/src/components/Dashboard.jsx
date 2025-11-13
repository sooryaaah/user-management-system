import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [attendanceTrend, setAttendanceTrend] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getusers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const users = response.data.data;
        setTotalEmployees(users.length);

        const today = new Date().toISOString().slice(0, 10);

        const presentCount = users.filter((user) =>
          user.attendance?.some(
            (entry) =>
              new Date(entry.date).toISOString().slice(0, 10) === today &&
              entry.present === true
          )
        ).length;

        setAttendance(presentCount);

        // Create fake trend data (for now)
        const trendData = Array.from({ length: 7 }).map((_, i) => ({
          day: `Day ${i + 1}`,
          present: Math.floor(Math.random() * users.length),
        }));
        setAttendanceTrend(trendData);
      } catch (error) {
        console.log("Error while fetching employees", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/gettasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tasks = response.data.data;

        const activeTasks = tasks.filter(
          (task) => task.status === "Pending" || task.status === "In Progress"
        );
        setPendingTasks(activeTasks.length);

        const tasksDone = tasks.filter((task) => task.status === "Completed");
        setCompletedTasks(tasksDone.length);
      } catch (error) {
        console.log("Error while fetching tasks", error);
        alert(error.message || error);
      }
    };

    fetchTasks();
  }, []);

  const COLORS = ["#60a5fa", "#34d399"];

  const taskData = [
    { name: "Active", value: pendingTasks },
    { name: "Completed", value: completedTasks },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16 md:pt-0">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="mx-6 mt-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">
            Welcome to your interactive admin dashboard
          </p>
        </div>

        {/* Stat Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Employees"
            value={totalEmployees}
            subtitle="Active employees"
          />
          <StatCard
            title="Active Tasks"
            value={pendingTasks}
            subtitle="Pending & in-progress"
          />
          <StatCard
            title="Present Today"
            value={attendance}
            subtitle={`Out of ${totalEmployees} Employees`}
          />
          <StatCard
            title="Completed Tasks"
            value={completedTasks}
            subtitle="Total completed"
          />
        </div>

        {/* Charts */}
        <div className="px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Distribution Pie Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Task Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {taskData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Line Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Attendance Trend (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
