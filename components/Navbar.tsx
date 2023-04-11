import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlineHome,
  AiOutlineLayout,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { FiBell } from "react-icons/fi";

import Login from "./user/Login";
import Users from "./Users";

const menuItems = [
  { id: 1, label: "首頁", icon: AiOutlineHome, link: "/" },
  { id: 2, label: "我的後台", icon: AiOutlineLayout, link: "/Dashboard" },
  { id: 3, label: "文件", icon: AiOutlineFileText, link: "/docs" },
  { id: 4, label: "創作", icon: AiOutlineForm, link: "/create" },
];

//TODO: 更改登入照片、響應式
const Navbar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const wrapperClasses = classNames("flex flex-col rounded-lg bg-yellow-50 justify-between px-4 pt-8 pb-4", {
    ["w-60"]: !toggleCollapse,
    ["w-20"]: toggleCollapse,
  });
  const collapseIconClasses = classNames({
    "rotate-180": toggleCollapse,
  });
  function getNavItemClasses(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _menu: { id: number; label: string; link: string } | { id: number; label: string; link: string },
  ) {
    return "";
  }
  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  return (
    <div>
      <nav className="flex flex-row items-center bg-tertiary p-2">
        <div className="flex items-center p-1">
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <AiOutlineDoubleLeft />
          </button>
        </div>
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
          <FiBell className="px-1 text-3xl text-black-200" />
        </div>
        <Login />
      </nav>
      {/* //sidebar */}
      <div className={wrapperClasses}>
        <div className="flex flex-col">
          <div className="mt-10 flex flex-col items-start">
            {menuItems.map(({ icon: Icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return (
                <div key={menu.id} className={classes}>
                  <Link href={menu.link}>
                    <div className="flex w-full items-center py-4 px-3">
                      <div className="w-8">
                        <Icon />
                      </div>
                      {!toggleCollapse && <div className={classNames("font-medium text-dark")}>{menu.label}</div>}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div
            className={classNames("flex flex-col", {
              hidden: toggleCollapse,
            })}
          >
            <div className="mt-5 flex w-full items-center py-4 px-3">
              <div className="w-8">
                <AiOutlineUsergroupDelete />
              </div>
              <div className="font-medium">已追蹤</div>
            </div>
            <div className="mt-1 flex w-full items-center px-3">
              <Users />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
