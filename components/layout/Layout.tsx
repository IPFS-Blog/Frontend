import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import React, { PropsWithChildren, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props: PropsWithChildren) => {
  // TODO: UI function
  const [sidebarOpen, sidebarSetOpen] = useState(false);

  const handleSidebarOpen = () => {
    sidebarSetOpen(!sidebarOpen);
  };

  return (
    <div className="flex w-full flex-col justify-items-stretch">
      <div className="flex">
        <button className="bg-tertiary" onClick={handleSidebarOpen}>
          {sidebarOpen ? <CloseIcon className="h-10 w-10 px-1" /> : <DragHandleIcon className="h-10 w-10 px-1" />}
        </button>
        <div className="w-full">
          <Navbar />
        </div>
      </div>

      <div className="flex flex-row">
        {sidebarOpen ? <Sidebar /> : null}
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
