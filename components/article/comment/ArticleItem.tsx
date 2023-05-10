import { Fullscreen } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import { IconButton, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
export default function ArticleItem({ username, id, title, subtitle, updateAt }: any) {
  return (
    // FIXME: Andy 接文章 api 顯示文章Item
    <li className="my-4 first:mt-0">
      <Link className="no-underline text" href={`/${username}/${id}`}>
        <div className="my-1 grid h-auto w-full bg-slate-200 grid-cols-12 gap-x-16 rounded-lg p-2 dark:bg-slate-800 dark:text-white">
          <div className="col-span-8">
            <p className="mb-2 text-2xl line-clamp-1 text-slate-900 dark:text-white tracking-tight font-bold">
              {title}
            </p>
            <div className="mb-2 flex flex-row items-center">
              <Avatar src="" alt="not find Avatar" />
              <div className="ml-2 flex items-center">
                <p className="text-base"> {username}</p>
              </div>
            </div>
            <p className="mb-2 text-base line-clamp-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          {/* FIXME:灰底要改為圖片 */}
          <div className="col-span-4 rounded-lg bg-gray-400">
            <img
              className="rounded-lg w-full h-full"
              src=""
              alt="Null"
            ></img>
          </div>
          {/* FIXME:Icon後的數字 */}
          <div className="col-span-12  flex items-center justify-between">
            <div className="flex items-center">
              <p className="ml-2">{updateAt.substring(0, 10)}</p>
              {/* TODO:喜歡 */}
              <IconButton className="ml-6">
                <FavoriteBorderOutlinedIcon className="text-black" />
              </IconButton>
              <span className="ml-2">100</span>
              {/* TODO:打賞 */}
              <IconButton className="ml-6">
                <StarsOutlinedIcon className="text-black" />
              </IconButton>
              <span className="ml-2">10</span>
            </div>
            <div className="flex items-center justify-end">
              {/* TODO:收藏 */}
              <IconButton className="mr-4">
                <BookmarkAddOutlinedIcon className="text-black" />
              </IconButton>
              <IconButton className="mr-4">
                <ArrowForwardOutlinedIcon className="text-black" />
              </IconButton>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
