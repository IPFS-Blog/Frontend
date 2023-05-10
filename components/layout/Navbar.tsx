import React from "react";

// import { FiBell } from "react-icons/fi";
import ThemeSwitch from "../ThemeSwitch";
import Login from "../users/Login";

const Navbar = () => {
  return (
    <div>
      <nav className="flex flex-row items-center bg-tertiary p-2">
        <div className="flex items-center p-1"></div>
        <div className="mr-6 flex shrink-0 items-center p-1 text-white">
          <span className="text-xl font-semibold tracking-tight text-blue-100">BrandName</span>
        </div>
        <form className="flex-auto px-10">
          <input
            type="text"
            className="items-center w-full rounded-md bg-white-50  px-3 py-2 text-gray-500 shadow-xl focus:border-blue-100 focus:outline-none focus:ring-2"
            placeholder="搜尋..."
          />
        </form>
        {/* FIXME: Lin 通知 */}
        {/* <div className="m-1">
          <FiBell className="px-1 text-3xl text-black-200" />
        </div> */}
        <div className="m-1">
          <ThemeSwitch />
        </div>
        <Login />
      </nav>
    </div>
  );
};

export default Navbar;
