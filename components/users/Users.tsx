import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

import Follow from "@/components/users/Follow";
export default function Users(props: any) {
  const User = useSelector((state: any) => state.User);
  return (
    <a
      href={"/" + props.username}
      className="my-2 flex flex-row items-center justify-between rounded border border-blue-200 bg-gray-50 p-2 dark:bg-gray-700"
    >
      {/* TODO: 文章擁有者資料 頭貼、名稱 */}
      <div className="flex flex-row items-center">
        <Avatar src={props.picture} alt="not find Avatar" />
        <div className="px-2">
          <div>{props.username}</div>
        </div>
        <div className="ml-10">{props.id != User.profile.id ? <Follow subscriberId={props.id} /> : null}</div>
      </div>
      <button>
        <ArrowOutwardOutlinedIcon />
      </button>
    </a>
  );
}
