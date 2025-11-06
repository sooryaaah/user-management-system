import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import DeleteAction from "../components/DeleteAction";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/gettasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching tasks");
      }
    };
    fetchTasks();
  }, []);

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/deletetask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error in delete task:", error);
      alert(error.message || error);
    }
  };

  // ===== Chart Data =====
  const statusCounts = {
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  const chartData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  const COLORS = ["#f87171", "#facc15", "#4ade80"]; // red, yellow, green

  // Tasks per Employee (Donut Chart)
  const employeeTaskCounts = tasks.reduce((acc, task) => {
    const name = task.assignedTo?.name || "Unassigned";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const employeeChartData = Object.entries(employeeTaskCounts).map(
    ([name, count]) => ({
      name,
      value: count,
    })
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Page Header */}
        <div className="mx-6 mt-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-gray-500">Manage and assign tasks to employees</p>
          </div>
          <AddTask onSuccess={() => window.location.reload()} />
        </div>

        {/* ===== TASK LIST (Clean Modern Style) ===== */}
        <div className="p-6">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks available</p>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-4 max-h-[280px] overflow-y-auto space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-3"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {task.assignedTo?.name || "Unassigned"} •{" "}
                      Due {task.dueDate?.slice(0, 10) || "-"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {task.status}
                    </span>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                    >
                      <DeleteAction />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* ===== CHART SECTION ===== */}
        <div className="mx-6 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BAR CHART */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Task Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  barSize={60}
                  radius={[10, 10, 0, 0]}
                  label={{ position: "top" }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* DONUT CHART */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Tasks per Employee
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employeeChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  label
                >
                  {employeeChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
