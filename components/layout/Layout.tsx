import React, { PropsWithChildren } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-row">
        <Sidebar />
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
