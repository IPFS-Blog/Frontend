import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
export default function ArticleItem() {
  return (
    <div className="grid h-auto w-full grid-cols-12 gap-x-16 rounded-lg border-2 border-blue-600 bg-white p-2">
      <div className="col-span-8">
        {/* FIXME:標題要改為文章標題 */}
        <p className="mb-2 text-xl font-bold">標題</p>
        <div className="mb-2 flex flex-row items-center">
          <Avatar className="h-10 w-10 rounded-full" src="" alt="not find Avatar" />
          <div className="ml-2 flex items-center">
            {/* FIXME:創作者名稱要改為文章創作者 */}
            <p className="text-base font-semibold ">創作者名稱:</p>
          </div>
        </div>
        {/* FIXME:文章中的字(可能顯示2行後面以...取代) */}
        <p className="mb-2 text-base font-semibold">
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
          <FavoriteBorderOutlinedIcon className="ml-6" />
          <span className="ml-2">100</span>
          <StarsOutlinedIcon className="ml-6" />
          <span className="ml-2">10</span>
        </div>
        <div className="flex items-center justify-end">
          <BookmarkAddOutlinedIcon className="mr-4" />
          <ArrowForwardOutlinedIcon className="mr-4" />
        </div>
      </div>
    </div>
  );
}
