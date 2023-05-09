import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
export default function ArticleItem() {
  return (
    // FIXME: Andy 接文章 api 顯示文章Item 抱歉了這邊全是假資料你要對一下
    <div className="my-1 grid h-auto w-full grid-cols-12 gap-x-16 rounded-lg border-2 border-blue-600 bg-white p-2 dark:bg-gray-500 dark:text-white">
      <div className="col-span-8">
        {/* FIXME:標題要改為文章標題 */}
        <p className="mb-2 text-xl">標題</p>
        <div className="mb-2 flex flex-row items-center">
          <Avatar src="" alt="not find Avatar" />
          <div className="ml-2 flex items-center">
            {/* FIXME:創作者名稱要改為文章創作者 */}
            <p className="text-base"> 創作者名稱</p>
          </div>
        </div>
        <p className="mb-2 text-base line-clamp-2">
          副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標副標
        </p>
      </div>
      {/* FIXME:灰底要改為圖片 */}
      <div className="col-span-4 bg-gray-400">
        <Image className="rounded-lg" src="/MetaMask.png" alt="Null" width={35} height={35}></Image>
      </div>
      {/* FIXME:Icon後的數字以及時間 */}
      <div className="col-span-12  flex items-center justify-between">
        <div className="flex items-center">
          <p className="ml-2">2023/05/06</p>
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
  );
}
