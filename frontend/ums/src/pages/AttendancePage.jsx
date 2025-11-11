import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { CheckCircle, XCircle, Calendar, LogIn } from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});

    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toLocaleDateString('en-CA'); // yyyy-mm-dd in local timezone
    });
    const token = localStorage.getItem("token");

    // Fetch employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:4000/getusers", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const filtered = res.data.data.filter(user => user.userType !== "admin");
                setEmployees(filtered);
            } catch (error) {
                alert("Error fetching employees");
            }
        };
        fetchEmployees();
    }, [token]);

    // Fetch attendance
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/attendance/${date}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const attendanceData = {};
                res.data.data.forEach(({ userId, present }) => {
                    attendanceData[userId] = present;
                });

                setAttendance(attendanceData);
            } catch (err) {
                alert("Error fetching attendance data");
            }
        };

        fetchAttendance();
    }, [date, token]);

    // Toggle attendance
    const toggleAttendance = (userId) => {
        setAttendance(prev => ({
            ...prev,
            [Id]: !prev[userId],
            
        }));
    };

    console.log("attendance: ", attendance)
    // Submit attendance
    const submitAttendance = async () => {
        try {
            await Promise.all(
                Object.entries(attendance).map(([userId, present]) =>
                    axios.post(
                        `http://localhost:4000/attendance/${userId}`,
                        { present, date },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                )
            );
            alert("✅ Attendance Saved");
        } catch (err) {
            alert("Error saving attendance");
        }
    };  

    console.log(" after submit attendance: ", attendance)

    // Chart data
    const presentCount = Object.values(attendance).filter(val => val === true).length;
    const absentCount = Object.values(attendance).filter(val => val === false).length;

    const chartData = [
        { name: "Present", value: presentCount },
        { name: "Absent", value: absentCount },
    ];

    const COLORS = ["#4ade80", "#f87171"]; // green & red

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />

                {/* Header */}
                <div className="mx-6 mt-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Attendance</h1>
                        <p className="text-gray-500">Mark daily attendance</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <Calendar className="text-gray-600" />
                        <input
                            type="date"
                            className="border px-3 py-2 rounded-lg"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button
                            onClick={submitAttendance}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Save Attendance
                        </button>
                    </div>
                </div>

                {/* Attendance Table */}
                <div className=" m-6 bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
                    <div className="max-h-[280px] overflow-y-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-700">
                                    <th className="p-3">Employee</th>
                                    <th className="p-3">Position</th>
                                    <th className="p-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center p-4 text-gray-500">
                                            No employees found
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map(emp => (
                                        <tr key={emp._id} className="border-b hover:bg-gray-50">
                                            <td className="flex items-center gap-3 p-3">
                                                <img
                                                    src={emp?.images?.secure_url}
                                                    className="w-10 h-10 rounded-full object-cover border"
                                                    alt="profile"
                                                />
                                                <span className="font-medium">{emp.name}</span>
                                            </td>
                                            <td className="p-3 text-gray-600">{emp.position}</td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => toggleAttendance(emp._id)}
                                                    className={`flex items-center gap-2 justify-center mx-auto px-3 py-1.5 rounded-md font-medium transition 
                                                ${attendance[emp._id] === true
                                                            ? "bg-green-100 text-green-700 border border-green-400"
                                                            : attendance[emp._id] === false
                                                                ? "bg-red-100 text-red-700 border border-red-400"
                                                                : "bg-gray-100 text-gray-600 border"}`}
                                                >
                                                    {attendance[emp._id] === true ? (
                                                        <>
                                                            <CheckCircle className="w-4 h-4" /> Present
                                                        </>
                                                    ) : attendance[emp._id] === false ? (
                                                        <>
                                                            <XCircle className="w-4 h-4" /> Absent
                                                        </>
                                                    ) : (
                                                        "Mark"
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Attendance Summary */}
                <div className="mx-6 mb-10 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-center">Today's Attendance Summary</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
