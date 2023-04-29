import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendIcon from "@mui/icons-material/Send";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

import Comment from "@/components/article/comment/Comment";

export default function Article() {
  // TODO: Handle funtion
  const [username] = useState(""); // 使用者名稱
  const [Label] = useState(""); // 添加標籤
  // TODO: UI funtion
  return (
    <div className="my-2 grid w-full grid-cols-12 gap-x-16 px-2">
      {/* 單一文章 */}
      <div className="col-span-8 text-base">
        <div className="my-2 flex flex-row items-center justify-between rounded border border-blue-200 p-2">
          {/* FIXME:文章擁有者資料 頭貼、名稱 */}
          <div className="flex flex-row items-center">
            <Avatar className="h-auto w-10 rounded-full" src="/black.png" alt="" />
            {/* <Avatar className="h-auto w-10 rounded-full" src={`${User.profile.photo}`} alt="" /> */}
            <div className="px-2">
              <div>{username}</div>
            </div>
          </div>
          <button>
            <ArrowOutwardOutlinedIcon />
          </button>
        </div>
        <div className="my-2 rounded border border-blue-200">
          {/* FIXME:文章資料 */}
          <div className="p-2">
            <h1 className="text-3xl font-semibold">title</h1>
            <h3 className="text-lg">subtitle</h3>
            <div>content</div>
          </div>

          {/* 文章內覽列 */}
          {/* FIXME:針對文章喜歡、讚賞、分享、收藏 */}
          {/* FIXME:響應式 table: phone: */}
          <div className="grid items-center gap-2 border border-blue-200 p-2">
            <div className="col-start-1 col-end-3 tablet:col-span-1 tablet:col-start-1">
              {/* 喜歡 */}
              <button className="rounded border border-red-500 py-2 px-10 font-semibold text-red-500 hover:bg-red-500 hover:text-white tablet:mx-2 tablet:px-5">
                <FavoriteBorderOutlinedIcon />
                <span>like</span>
              </button>
              {/* 讚賞 */}
              <button className="mx-5 rounded border border-blue-500 py-2 px-10 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white tablet:mx-2 tablet:px-5">
                <StarsOutlinedIcon />
                <span>appreciate</span>
              </button>
            </div>
            <div className="col-span-1 col-end-7 flex flex-row items-center">
              {/* 分享 */}
              {/* <button className="mx-1 h-5 w-5 rounded-lg hover:bg-gray-500 hover:text-white">
                <IosShareOutlinedIcon />
              </button> */}
              {/* 收藏 */}
              <button className="mx-1 h-10 w-10 rounded-lg text-yellow-500 hover:bg-yellow-300 hover:text-white dark:text-yellow-300">
                <BookmarkAddOutlinedIcon />
              </button>
              <p className="mx-1 font-mono">2022-04-27</p>
            </div>
          </div>

          {/* FIXME:輸入留言、顯示留言 */}
          {/* 輸入留言 */}
          <form>
            <div className="flex items-center bg-gray-50 px-3 py-1 dark:bg-gray-700">
              <Avatar className="h-auto w-10 rounded-full" src="/avater.jpg" alt="" />
              {/* <Avatar className="h-auto w-10 rounded-full" src={`${User.profile.photo}`} alt="" /> */}
              <p className="mx-2">{username}</p>
              <textarea
                id="chat"
                className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="輸入留言..."
              ></textarea>
              <button
                type="submit"
                className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
              >
                <SendIcon />
              </button>
            </div>
          </form>

          {/* 顯示留言 */}
          <div className="my-2 divide-y divide-blue-200">
            <Comment></Comment>
          </div>
        </div>
      </div>

      {/* 右側欄 */}
      <div className="col-span-4">
        {/* FIXME:個人資料(頭像、名稱、標籤) */}
        <div className="col-span-2 flex justify-center">
          <Avatar className="h-auto w-1/2 rounded-full" src="/black.png" alt="" />
          {/* <Avatar className="h-auto w-1/2 rounded-full" src={`${User.profile.photo}`} alt="" /> */}
        </div>
        <div className="text-center">
          {/* ${Username} */}
          <div className="my-2 px-2">{username}</div>
          {/*Label*/}
          <span className="inline-grid grid-cols-3 gap-1">{Label}</span>
          <button className="my-2 rounded border border-red-500 py-2 px-20 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
            追蹤
          </button>
        </div>
        <div className="my-5 px-2">
          {/* FIXME:推薦使用者資料 */}
          <div className="text-base">推薦使用者</div>
          <ul className="divide-y divide-blue-200">
            <li></li>
          </ul>
        </div>
        <div className="my-5 px-2">
          <div className="text-base">熱門標籤</div>
          {/* FIXME:熱門標籤資料 */}
          <span className="flex flex-wrap gap-2">{Label}</span>
        </div>
      </div>
    </div>
  );
}
