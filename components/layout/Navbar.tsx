import React from "react";

// import { FiBell } from "react-icons/fi";
import ThemeSwitch from "../ThemeSwitch";
import Login from "../users/Login";

const Navbar = () => {
  return (
    <div>
      <nav className="flex flex-row items-center bg-tertiary p-2">
        <div className="flex items-center p-1"></div>
        <div className="mr-2 flex shrink-0 items-center p-1">
          <span className="select-none font-semibold tracking-tight text-blue-100">IPFS 幣記</span>
        </div>
        <form className="mx-20 flex-auto">
          <input
            type="text"
            className="w-full items-center rounded-md border-blue-200 bg-white-50 px-3 py-2 text-gray-500 outline-none ring focus:border-blue-400 focus:outline-none focus:ring-4"
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
