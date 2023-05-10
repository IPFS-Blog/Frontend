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
    <Link href={`/${username}/${id}`}>
      <div className="my-1 grid h-auto w-full grid-cols-12 gap-x-16 rounded-lg border-2 border-blue-600 p-2 dark:bg-gray-500 dark:text-white">
        <div className="col-span-8">
          <p className="mb-2 text-xl">{title}</p>
          <div className="mb-2 flex flex-row items-center">
            <Avatar src="" alt="not find Avatar" />
            <div className="ml-2 flex items-center">
              <p className="text-base"> {username}</p>
            </div>
          </div>
          <p className="mb-2 text-base line-clamp-2">{subtitle}</p>
        </div>
        {/* FIXME:灰底要改為圖片 */}
        <div className="col-span-4 bg-gray-400">
          <Image className="rounded-lg" src="/MetaMask.png" alt="Null" width={35} height={35}></Image>
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
  );
}
