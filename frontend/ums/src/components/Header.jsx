import React from "react";
import AdminIcon from "./AdminIcon";

const Header = () => {



  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 ">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <button>{<AdminIcon/>}</button>
    </header>
  );
};

export default Header;
