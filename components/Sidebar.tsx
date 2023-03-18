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

import Users from "./Users";
//TODO:更改打開導覽、關閉導覽按鈕
const menuItems = [
  { id: 1, label: "首頁", icon: AiOutlineHome, link: "/" },
  { id: 2, label: "我的後台", icon: AiOutlineLayout, link: "/Dashboard" },
  { id: 3, label: "文件", icon: AiOutlineFileText, link: "/docs" },
  { id: 4, label: "創作", icon: AiOutlineForm, link: "/create/dashboard" },
];
const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames("h-screen flex flex-col rounded-lg bg-yellow-50 justify-between px-4 pt-8 pb-4", {
    ["w-60"]: !toggleCollapse,
    ["w-20"]: toggleCollapse,
  });
  const collapseIconClasses = classNames("p-4 rounded bg-gray-100 rounded-lg absolute right-0", {
    "rotate-180": toggleCollapse,
  });
  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };
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
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1">
            {isCollapsible && (
              <button className={collapseIconClasses} onClick={handleSidebarToggle}>
                <AiOutlineDoubleLeft />
              </button>
            )}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link}>
                  <div className="flex h-full w-full items-center py-4 px-3">
                    <div style={{ width: "2.5rem" }}>
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
          <div className="mt-5 flex h-full w-full items-center py-4 px-3">
            <div style={{ width: "2.5rem" }}>
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
  );
};
export default Sidebar;
