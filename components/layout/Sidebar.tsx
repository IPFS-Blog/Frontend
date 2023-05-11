import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import {
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlineHome,
  AiOutlineLayout,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";

import Users from "../Users";

const menuItems = [
  { id: 1, label: "首頁", icon: AiOutlineHome, link: "/" },
  { id: 2, label: "我的後台", icon: AiOutlineLayout, link: "/Dashboard" },
  { id: 3, label: "文件", icon: AiOutlineFileText, link: "/docs" },
  { id: 4, label: "創作", icon: AiOutlineForm, link: "/create" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const collapseIconClasses = classNames({
    // "rotate-180": toggleCollapse,
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
      {/* //sidebar */}
      <div className="m-2 flex w-auto flex-col justify-between rounded-lg bg-yellow-50 px-4 pt-8 pb-4">
        <div className="flex flex-col">
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <AiOutlineDoubleLeft />
          </button>
          <div className="mt-2 flex flex-col items-start">
            {menuItems.map(({ icon: Icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return (
                <div key={menu.id} className={classes}>
                  <Link href={menu.link}>
                    <div className="flex w-full items-center py-4 px-3">
                      <div className="w-8">
                        <Icon />
                      </div>
                      {!toggleCollapse && <div className={classNames("font-medium text-dark w-20")}>{menu.label}</div>}
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
              <div className="select-none font-medium">已追蹤</div>
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

export default Sidebar;
