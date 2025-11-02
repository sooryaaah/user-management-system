import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, ClipboardList } from "lucide-react";

const AddTask = ({ onSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);

  // Fetch employees (to assign tasks)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {

        const token = localStorage.getItem("token")

        const res = await axios.get("http://localhost:4000/getusers", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(res.data.data);
      } catch (err) {
        console.log("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")
      const newTask = { title, assignedTo, dueDate, description };

      await axios.post("http://localhost:4000/addtask", newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Task added successfully ✅");
      setShowModal(false);

      // Reset fields
      setTitle("");
      setAssignedTo("");
      setDueDate("");
      setDescription("");

      if (onSuccess) onSuccess(); // refresh tasks list
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
      >
        <Plus size={18} /> Add Task
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ClipboardList size={20} /> Create New Task
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Employee Select */}
              <div>
                <label className="block text-sm font-medium mb-1">Assign To</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task details..."
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
