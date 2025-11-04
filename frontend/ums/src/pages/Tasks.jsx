import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Plus, ClipboardList } from "lucide-react";
import AddTask from "../components/AddTask";
import { useEffect } from "react";
import axios from "axios";
import DeleteAction from "../components/DeleteAction"

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

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

  const deleteTask = async (id) =>{
    try {
       const token = localStorage.getItem("token");

       const response = await axios.delete(`http://localhost:4000/deletetask/${id}` , {
        headers: {Authorization: `Bearer ${token}`}
       })
       setTasks(prev => prev.filter(task => task._id !== id))
    } catch (error) {
      console.log("error in delete task :", error);
      alert(error.message || error)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="mx-6 mt-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-gray-500">Manage and assign tasks to employees</p>
          </div>

          {/* Pass fetchTasks here so adding new task refreshes */}
          <AddTask onSuccess={() => window.location.reload()} />
        </div>

        {/* Task List */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="border rounded-xl shadow-sm p-5 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <span className="text-sm text-blue-600 font-medium">Assigned</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Assigned to:{" "}
                  <span className="font-medium text-gray-800">
                    {task.assignedTo?.name || "Unknown"}
                  </span>
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Due: {task.dueDate?.slice(0, 10)}</span>
                  <button onClick={()=> deleteTask(task._id)} className="text-indigo-600 hover:underline"> <DeleteAction/> </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;