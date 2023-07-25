import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

const options = [
  "Edit",
  "Delete",
];

const Comment = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 rounded-lg bg-white shadow-lg dark:bg-gray-700 dark:text-slate-300">
        <div className="relative flex gap-4">
          <Avatar className="border h-15 w-15 rounded-full" src={props.picture} alt="not found" />
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{props.username}</p>
            </div>
            <p className="text-gray-400 text-sm">{props.updateAt.substr(0, 10)}</p>
          </div>
          <div className="grid grid-cols-2">
            <button
              type="submit"
              className="inline-flex cursor-pointer justify-center rounded-full p-2 h-fit text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
            >
              <ThumbUpOutlinedIcon />
            </button>
            <p className="inline-flex justify-center p-2">{props.like}</p>
          </div>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "20ch",
                },
              }}
            >
              {options.map(option => (
                <MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <p className="-mt-4 text-gray-500">{props.contents}</p>
      </div>
    </div>
  );
};

export default Comment;
