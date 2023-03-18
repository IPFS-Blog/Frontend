import "@/styles/Navbar.module.css";

import React from "react";
import { FiBell } from "react-icons/fi";

import Login from "./user/Login";

//TODO: 更改登入照片、響應式
const Navbar = () => {
  return (
    <nav className="flex flex-row items-center bg-tertiary p-2">
      <div className="mr-6 flex shrink-0 items-center p-1 text-white">
        <span className="text-xl font-semibold tracking-tight text-bule-100">BrandName</span>
      </div>
      <form className="w-64 flex-auto">
        <input
          type="text"
          className="items-center rounded-md bg-white-50  px-3 py-2 text-gray-500 shadow-xl focus:border-bule-100 focus:outline-none focus:ring-2"
          placeholder="搜尋..."
        />
      </form>
      <div className="m-1">
        <FiBell className="text-3xl text-black-200 shadow-xl" />
      </div>
      <Login />
    </nav>
  );
};

export default Navbar;
