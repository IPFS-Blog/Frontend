import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
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
        <nav className="flex flex-row items-center bg-tertiary p-2">
          <Link href="/">
            <div className="mr-2 flex shrink-0 items-center p-1">
              <img src="/logo/48.png" alt="not found" />
              <span className="xs:hidden laptop:visible laptop:flex laptop:select-none laptop:px-2 laptop:text-2xl laptop:font-semibold laptop:tracking-tight laptop:text-blue-400 laptop:dark:text-sky-500">
                IPFS幣記
              </span>
            </div>
          </Link>
          <form className="xs:invisible tablet:visible tablet:mx-20 tablet:flex-auto">
            <input
              type="text"
              className="w-full items-center rounded-md border-blue-200 bg-white-50 px-3 py-2 text-gray-500 outline-none ring focus:border-blue-400 focus:outline-none focus:ring-4"
              placeholder="搜尋..."
            />
          </form>
          {/* FIXME: Lin 通知 */}
          <div className="group m-1">
            <span className="mx-2 cursor-pointer rounded-full py-2 text-gray-700 dark:text-white">
              <NotificationsNoneIcon />
            </span>
            <span className="invisible absolute rounded-lg bg-gray-900 p-2 text-sm font-medium text-white group-hover:visible group-hover:translate-y-10 group-hover:-translate-x-10 dark:bg-gray-700">
              開發中_
            </span>
          </div>
          <div className="m-1">
            <ThemeSwitch />
          </div>
          <Login />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
