import FindInPageIcon from "@mui/icons-material/FindInPage";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import ThemeSwitch from "../ThemeSwitch";
import Login from "../users/Login";

const Navbar = () => {
  const router = useRouter();
  const routerPath = router.asPath;

  const hideNavbar = routerPath === "/Dashboard" || routerPath.startsWith("/articleHistory/");

  if (hideNavbar) {
    return null;
  }

  return (
    <>
      <div>
        <nav className="flex flex-row items-center justify-between bg-tertiary p-2">
          <Link href="/">
            <div className="mr-2 flex shrink-0 items-center p-1">
              <img src="/logo/48.png" alt="not found" />
              <span className="xs:hidden laptop:visible laptop:flex laptop:select-none laptop:px-2 laptop:text-2xl laptop:font-semibold laptop:tracking-tight laptop:text-blue-400 laptop:dark:text-sky-500">
                IPFS幣記
              </span>
            </div>
          </Link>
          <form className="xs:invisible tablet:visible tablet:mx-20 tablet:w-auto">
            <div className="flex space-x-2 rounded-lg bg-gray-200 p-2 dark:bg-slate-700">
              <div className="rounded-md bg-gray-100 dark:bg-slate-800">
                <PersonSearchIcon className="mx-1 text-gray-500 dark:text-gray-300" />
                <input
                  type="text"
                  className="w-auto items-center rounded-r-md border-blue-200 px-3 py-2 text-gray-500 outline-none focus:border-blue-400 focus:outline-none dark:bg-slate-800 placeholder:dark:text-gray-300"
                  placeholder="創作者姓名"
                />
              </div>
              <div className="rounded-md bg-gray-100 dark:bg-slate-800">
                <FindInPageIcon className="mx-1 text-gray-500 dark:text-gray-300" />
                <input
                  type="text"
                  className="w-auto items-center rounded-r-md border-blue-200 px-3 py-2 text-gray-500 outline-none focus:border-blue-400 focus:outline-none dark:bg-slate-800  placeholder:dark:text-gray-300 "
                  placeholder="文章名稱"
                />
              </div>
              <button
                className=" ml-2 cursor-pointer rounded-lg p-2 font-semibold text-gray-500 transition hover:shadow-2xl hover:ring dark:text-gray-300"
                type="button"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className="flex flex-row items-center">
            {/* FIXME: Lin 通知 */}
            <div className="group m-1">
              <span className="cursor-pointer rounded-md p-2 text-gray-700 hover:border-blue-400 hover:shadow-lg hover:outline-none hover:ring-4 dark:text-white">
                <NotificationsNoneIcon />
              </span>
              <span className="invisible absolute rounded-lg bg-gray-900 p-2 text-sm font-medium text-white hover:shadow-lg group-hover:visible group-hover:translate-y-10 group-hover:-translate-x-10 dark:bg-gray-700">
                開發中_
              </span>
            </div>
            <div className="m-1">
              <ThemeSwitch />
            </div>
            <Login />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
