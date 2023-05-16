import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { apiArticleTakeArticle } from "@/components/api";
import Comment from "@/components/article/comment/Comment";
import DonateButton from "@/components/users/DonateButton";
import { update } from "@/store/CreaterSlice";

export default function Article(props: any) {
  // TODO: Handle funtion
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User);

  useEffect(() => {
    // TODO: 文章創作者資料
    dispatch(update(JSON.stringify(props.createrData)));
  }, [dispatch, props.createrData]);

  // TODO: UI funtion
  return (
    // 單一文章
    <div className="my-2 grid w-full grid-cols-12 gap-x-16 px-2">
      <div className="col-span-8 text-base">
        <a
          href={"/" + props.createrData.username}
          className="my-2 flex flex-row items-center justify-between rounded border border-blue-200 bg-gray-50 p-2 dark:bg-gray-700"
        >
          {/* TODO: 文章擁有者資料 頭貼、名稱 */}
          <div className="flex flex-row items-center">
            <Avatar className="h-auto w-10 rounded-full" src={props.createrData.photo} alt="not find Avatar" />
            <div className="px-2">
              <div>{props.createrData.username}</div>
            </div>
          </div>
          <button>
            <ArrowOutwardOutlinedIcon />
          </button>
        </a>
        <div className="my-2 rounded border border-blue-200 bg-gray-50 dark:bg-gray-700">
          {/* TODO: 文章資料 */}
          <div className="p-2">
            <h1 className="text-3xl font-semibold">{props.article.title}</h1>
            <h3 className="mt-3 mb-4 text-lg">{props.article.subtitle}</h3>
            <div className="whitespace-pre-line">{props.article.contents}</div>
          </div>
          {/* 文章內覽列 */}
          {/* FIXME:針對文章喜歡、讚賞、分享、收藏 */}
          {/* FIXME:響應式 table: phone: */}
          <div className="grid items-center gap-2 bg-gray-100 p-2 dark:bg-gray-800">
            <div className="col-start-1 col-end-3 tablet:col-span-1 tablet:col-start-1">
              {/* 喜歡 */}
              <button className="rounded border border-red-500 py-2 px-10 font-semibold text-red-500 hover:bg-red-500 hover:text-white tablet:mx-2 tablet:px-5">
                <FavoriteBorderOutlinedIcon />
                <span>like</span>
              </button>
              {User.profile.login ? <DonateButton /> : null}
            </div>
            <div className="col-span-1 col-end-7 flex flex-row items-center">
              {/* 分享 */}
              {/* <button className="mx-1 h-5 w-5 rounded-lg hover:bg-gray-500 hover:text-white">
                <IosShareOutlinedIcon />
              </button> */}
              {/* 收藏 */}
              <button className="mx-1 h-10 w-10 rounded-lg text-yellow-500 hover:bg-yellow-300 hover:text-white">
                <BookmarkAddOutlinedIcon />
              </button>
              <p className="mx-1 font-mono">{props.article.updateAt.substr(0, 10)}</p>
            </div>
          </div>
          {/* TODO: 使用者頭像、名稱 */}
          {/* 輸入留言 */}
          <form>
            <div className="flex items-center bg-gray-50 px-3 py-1 dark:bg-gray-700">
              <Avatar className="h-auto w-10 rounded-full" src={User.profile.photo} alt="not find Avatar" />
              <p className="mx-2">{User.profile.name}</p>
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
        {/* TODO: 文章擁有者資料 頭貼、名稱 */}
        <div className="col-span-2 flex justify-center">
          <Avatar className="h-auto w-1/2 rounded-full" src={props.createrData.photo} alt="not find Avatar" />
        </div>
        <div className="text-center">
          {/* ${Username} */}
          <div className="my-2 px-2">{props.createrData.username}</div>
          {/* FIXME: 標籤 */}
          {/*Label*/}
          {/* <span className="inline-grid grid-cols-3 gap-1">{label}</span> */}
          <button className="my-2 rounded border border-red-500 py-2 px-20 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
            追蹤
          </button>
        </div>
        {/* FIXME:推薦使用者資料 */}
        <div className="my-5 px-2">
          <div className="text-base font-semibold">推薦使用者</div>
          <ul className="divide-y divide-blue-200">
            <li className="grid w-full grid-cols-4 py-1">
              <div className="col-span-3 flex">
                <Avatar></Avatar>
                <div className="px-2">
                  <p>Lin</p>
                  <p className="line-clamp-2">Hello</p>
                </div>
              </div>
              <button className="my-2 h-8 rounded-full border border-red-500 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                追蹤
              </button>
            </li>
            <li className="grid w-full grid-cols-4 py-1">
              <div className="col-span-3 flex">
                <Avatar></Avatar>
                <div className="px-2">
                  <p>Rj</p>
                  <p className="line-clamp-2">
                    ng duis excepteur esse in duis nostrud occaecat mollit incididunt desaccaecat
                  </p>
                </div>
              </div>
              <button className="my-2 h-8  rounded-full border border-red-500 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                追蹤
              </button>
            </li>
            <li className="grid w-full grid-cols-4 py-1">
              <div className="col-span-3 flex">
                <Avatar></Avatar>
                <div className="px-2">
                  <p>Amy</p>
                  <p className="line-clamp-2">我是一位熱愛設計的設計師</p>
                </div>
              </div>
              <button className="my-2 h-8 rounded-full border border-red-500 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                追蹤
              </button>
            </li>
          </ul>
        </div>
        {/* FIXME:熱門標籤資料 10筆 */}
        <div className="my-5 px-2">
          <div className="text-base font-semibold">熱門標籤</div>
          <div className="flex flex-wrap gap-2 py-2">
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">前端</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">狗狗</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p>
              <p className="inline-block align-middle">網頁設計</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">家庭</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p>{" "}
              <p className="inline-block align-middle">家庭旅遊好去處</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">新生季</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">Chatgpt</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">Java</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">C++</p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-500 px-2 text-slate-900 dark:text-white ">
              <p className="inline-block pr-1 align-middle">#</p> <p className="inline-block align-middle">後端</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  // 查詢文章
  const ArticleUrl = context.req.url.split("/")[2];
  let createrData = { id: 0, username: "", address: "", email: "", photo: "" };
  let article = { title: "", subtitle: "", contents: "", updateAt: "" };

  await apiArticleTakeArticle(ArticleUrl)
    .then(res => {
      createrData = res.data.user;
      const resarticle = {
        title: res.data.title,
        subtitle: res.data.subtitle,
        contents: res.data.contents,
        updateAt: res.data.updateAt,
      };
      article = resarticle;
    })
    .catch(() => {
      return {
        notFound: true,
      };
    });

  if (createrData.username != context.req.url.split("/")[1])
    return {
      notFound: true,
    };
  return { props: { article, createrData } };
};
