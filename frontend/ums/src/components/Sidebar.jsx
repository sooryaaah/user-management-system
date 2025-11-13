import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CalendarCheck,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-50 border-r border-gray-200 shadow-sm flex flex-col transform transition-transform duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="px-6 py-4 mt-2 text-sm text-gray-600 hidden md:block">
          Admin Panel
        </div>
        <nav className="flex-1 mt-16 md:mt-0">
          <ul>
            <li
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 pt-6 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium"
            >
              <LayoutDashboard size={18} />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium"
            >
              <Users size={18} />
              <Link to="/employees">Employees</Link>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium"
            >
              <ClipboardList size={18} />
              <Link to="/tasks">Tasks</Link>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium"
            >
              <CalendarCheck size={18} />
              <Link to="/attendance">Attendance</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-20"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
