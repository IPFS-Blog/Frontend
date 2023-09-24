import Avatar from "@mui/material/Avatar";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiOutlineBarChart,
  AiOutlineDoubleLeft,
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlineHome,
  AiOutlineLayout,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { FaFaucet } from "react-icons/fa";

import { _apiCheckJwt, apiUserGetCreatorOwnSubscribers } from "@/components/api";
import ThemeSwitch from "@/components/ThemeSwitch";

const menuItems = [
  { id: 1, label: "首頁", icon: AiOutlineHome, link: "/" },
  { id: 2, label: "我的後台", icon: AiOutlineLayout, link: "/Dashboard" },
  { id: 3, label: "文件", icon: AiOutlineFileText, link: "/docs" },
  { id: 4, label: "創建", icon: AiOutlineForm, link: "/CreateArticle" },
  { id: 5, label: "水龍頭", icon: FaFaucet, link: "/SimpleFaucet" },
];
const dashboardSidebar = [
  { id: 1, label: "首頁", icon: AiOutlineHome, link: "/" },
  { id: 2, label: "我的後台", icon: AiOutlineLayout, link: "/Dashboard" },
  { id: 3, label: "創建", icon: AiOutlineForm, link: "/CreateArticle" },
  { id: 5, label: "瀏覽文章數據", icon: AiOutlineBarChart, link: "/SimpleFaucet" },
];

interface User {
  id: number;
  username: string;
  picture: string;
}

const Sidebar = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function follow() {
      let jwt = "";
      await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
      if (jwt != null) {
        apiUserGetCreatorOwnSubscribers(jwt)
          .then((res: any) => {
            console.log(res);
            setUsers(res.data.subscribers);
            // const subscribersData = res.data.subscribers;
            // dispatch(updatedSubscribers(subscribersData));
            // dispatch(updatedSubscribers(res.data.subscribers));
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    }
    follow();
  }, []);

  const router = useRouter();
  const routerPath = router.asPath;
  const [toggleCollapse, setToggleCollapse] = useState(false);
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
  const hideNavbar = routerPath === "/Dashboard" || routerPath.startsWith("/articleHistory/");

  return (
    <div>
      <div className="m-2 flex w-auto flex-col justify-between rounded-lg bg-gray-200 px-4 pt-8 pb-4 dark:bg-slate-700">
        <div className="flex flex-col">
          <button
            className={`${collapseIconClasses} rounded-md p-2 hover:bg-gray-300 hover:text-gray-700 dark:hover:bg-gray-500 dark:hover:text-gray-100`}
            onClick={handleSidebarToggle}
          >
            <AiOutlineDoubleLeft className="text-gray-700 dark:text-gray-200" />
          </button>
          <div className="mt-2 flex w-full flex-col">
            {/* TODO: 如果是Dashboard、articleHistory會換sidebar */}
            {!hideNavbar
              ? menuItems.map(({ icon: Icon, ...menu }) => {
                  const classes = getNavItemClasses(menu);
                  return (
                    <div key={menu.id} className={classes}>
                      <Link href={menu.link}>
                        <div className="flex w-full items-center rounded-md py-4 px-3 hover:bg-gray-300 hover:text-gray-700 dark:hover:bg-gray-500 dark:hover:text-gray-100">
                          <div className="mr-2 w-auto">
                            <Icon className="text-lg text-gray-700 dark:text-gray-200" />
                          </div>
                          {toggleCollapse && (
                            <div className={classNames("font-medium text-dark w-max dark:text-gray-300")}>
                              {menu.label}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })
              : dashboardSidebar.map(({ icon: Icon, ...menu }) => {
                  const classes = getNavItemClasses(menu);
                  return (
                    <div key={menu.id} className={classes}>
                      <Link href={menu.link}>
                        <div className="flex w-full items-center rounded-md py-4 hover:bg-gray-300 hover:text-gray-700 dark:hover:bg-gray-500 dark:hover:text-gray-100">
                          <div className="mr-2 w-auto">
                            <Icon className="text-lg text-gray-700 dark:text-gray-200" />
                          </div>
                          {toggleCollapse && (
                            <div className={classNames("font-medium text-dark w-max dark:text-gray-300")}>
                              {menu.label}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
          </div>
          <div
            className={classNames("flex flex-col", {
              hidden: !toggleCollapse,
            })}
          >
            <div className="mt-5 flex w-full items-center py-4">
              <div className="w-8">
                <AiOutlineUsergroupDelete />
              </div>
              <div className="select-none font-medium">已追蹤</div>
            </div>
            <div className="mt-1 flex w-full items-center">
              <ul>
                {users.map(user => (
                  <li key={user.id}>
                    <a href={"/" + user.username}>
                      <div className="flex h-fit w-full items-center rounded-md px-2 hover:bg-gray-300 hover:text-gray-700 dark:hover:bg-gray-500 dark:hover:text-gray-100">
                        <div className="my-2 w-auto">
                          <Avatar className="h-auto w-6 rounded-full" src={user.picture} alt="not find Avatar" />
                        </div>
                        <div className="ml-2">{user.username}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
