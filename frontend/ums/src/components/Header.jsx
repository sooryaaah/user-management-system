import React from "react";
import { Menu } from "lucide-react";
import AdminIcon from "./AdminIcon";

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 fixed top-0 left-0 right-0 z-40 md:static">
      <div className="flex items-center gap-3">
        {/* Hamburger only on mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100 md:hidden"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <button>
        <AdminIcon />
      </button>
    </header>
  );
};

export default Header;
