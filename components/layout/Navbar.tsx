import FindInPageIcon from "@mui/icons-material/FindInPage";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
          <div className="flex items-center">
            <Link href="/">
              <div className="flex shrink-0 items-center p-1 laptop:mr-2">
                <img
                  src="/logo/48.png"
                  alt="not found"
                  className="h-7 w-7 phone:h-11 phone:w-11 tablet:h-12 tablet:w-12"
                />
                <span className="hidden laptop:visible laptop:flex laptop:select-none laptop:px-2 laptop:text-2xl laptop:font-semibold laptop:tracking-tight laptop:text-blue-400 laptop:dark:text-sky-500">
                  IPFS幣記
                </span>
              </div>
            </Link>
            <form className="grid justify-items-start tablet:w-auto laptop:mx-20">
              <div className="flex flex-col rounded-lg bg-gray-200 p-2 dark:bg-slate-700 tablet:flex-row tablet:space-x-2">
                <div className="mb-1 flex items-center rounded-md bg-gray-100 dark:bg-slate-800">
                  <PersonSearchIcon className="hidden laptop:visible laptop:mx-1 laptop:flex laptop:w-fit laptop:text-gray-500 laptop:dark:text-gray-300" />
                  <input
                    type="text"
                    className="w-auto items-center rounded-r-md bg-gray-100 px-3 text-gray-500 outline-none focus:outline-none dark:bg-slate-800  placeholder:dark:text-gray-300"
                    placeholder="創作者姓名"
                  />
                </div>
                <div className="flex items-center rounded-md bg-gray-100 dark:bg-slate-800">
                  <FindInPageIcon className="hidden laptop:visible laptop:mx-1 laptop:flex laptop:w-fit laptop:text-gray-500 laptop:dark:text-gray-300" />
                  <input
                    type="text"
                    className="w-auto items-center rounded-r-md bg-gray-100 px-3 text-gray-500 outline-none focus:outline-none dark:bg-slate-800  placeholder:dark:text-gray-300"
                    placeholder="文章名稱"
                  />
                </div>
                <button
                  className="ml-2 cursor-pointer rounded-lg p-2 font-semibold text-gray-500 transition hover:shadow-2xl hover:ring dark:text-gray-300"
                  type="button"
                >
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-row items-center">
            {/* FIXME: Lin 通知 */}
            <div className="group m-2">
              <span className="cursor-pointer rounded-md p-2 text-gray-700 hover:border-blue-400 hover:shadow-lg hover:outline-none hover:ring-4 dark:text-white">
                <NotificationsNoneIcon />
              </span>
              <span className="invisible absolute rounded-lg bg-gray-900 p-1 text-sm font-medium text-white hover:shadow-lg group-hover:visible group-hover:translate-y-10 group-hover:-translate-x-10 dark:bg-gray-700">
                開發中
              </span>
            </div>
            <Login />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
