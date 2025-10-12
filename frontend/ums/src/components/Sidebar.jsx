import { LayoutDashboard, Users, ClipboardList, CalendarCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  
  
  
  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 shadow-sm flex flex-col">
      <div className="px-6 py-4 mt-2 text-sm text-gray-600">Admin Panel</div>
      <nav className="flex-1">
        <ul className="">
          <li className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium">
            <LayoutDashboard size={18} /> <Link to = '/'> Dashboard </Link>
          </li>
          <li className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium">
            <Users size={18} /> 
            <Link to='/employees' > Employees </Link>
          </li>
          <li className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium">
            <ClipboardList size={18} />  <Link to='/tasks'>Tasks</Link>
          </li>
          <li className="px-6 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 text-gray-700 font-medium">
            <CalendarCheck size={18} /> Attendance
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
