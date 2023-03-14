/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import "@/styles/Navbar.module.css";

import Image from "next/image";
import React from "react";
import { FiBell } from "react-icons/fi";

import { LogoIcon } from "./icons";
//TODO: 更改登入照片、響應式
const Navbar = () => {
  return (
    <nav className="flex flex-row items-center bg-tertiary p-2">
      <div className="mr-6 flex shrink-0 items-center p-1 text-white">
        <LogoIcon />
        <span className="text-xl font-semibold tracking-tight text-bule-100">BrandName</span>
      </div>
      <form className="w-64 flex-auto">
        <input
          type="text"
          className="rounded-md bg-white-100 px-3  py-2 text-gray-500 shadow-xl focus:border-bule-100 focus:outline-none focus:ring-2"
          placeholder="搜尋..."
        />
      </form>
      <div className="m-1">
        <FiBell className="text-3xl text-black-200 shadow-xl" />
      </div>
      <button className="">
        <Image src="Login.svg" alt="Picture of the author" width={150} height={40} />
      </button>
    </nav>
  );
};

export default Navbar;
