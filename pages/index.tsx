import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import ArticleItem from "@/components/article/comment/ArticleItem";
import { setLogin } from "@/store/UserSlice";
import { Avatar } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function login() {
      let jwt = "";
      const res_CheckJwt = await _apiCheckJwt();
      jwt = res_CheckJwt.data.jwt;
      const res_GetUserData = await apiUserGetUserData(jwt);
      dispatch(setLogin(JSON.stringify(res_GetUserData.data.userData)));
    }
    login();
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      {/* FIXME: 要判斷熱門文章、最新文章 顯示 文章項目 */}
      <menu className="my-5 flex justify-between bg-blue-200 py-3">
        <ul className="flex h-full items-center">
          <li>
            <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              最熱門文章
            </a>
          </li>
          <li>
            <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              最新文章
            </a>
          </li>
        </ul>
      </menu>
      <main className="my-2 grid w-full grid-cols-12 gap-x-16 px-2">
        <div className="col-span-8">
          <div>
            {/* FIXME: Andy 接文章 api 顯示文章Item */}
            {/* {articles.map(article => (
            <ArticleItem key={article.id} article={article} />
          ))} */}
            <ArticleItem />
            <ArticleItem />
            <ArticleItem />
            <ArticleItem />
          </div>
        </div>
        {/* FIXME: Lin 右側欄考慮做成 components */}
        <div className="col-span-4">
          <div className="my-5 px-2">
            {/* FIXME:推薦使用者資料 */}
            <div className="text-base">推薦使用者</div>
            <ul className="divide-y divide-blue-200 my-1">
              <li className="grid grid-cols-4 w-full py-1">
                <div className="col-span-3 flex">
                  <Avatar></Avatar>
                  <div className="px-2">
                    <p>Lin</p>
                    <p className="line-clamp-2">Hello</p>
                  </div>
                </div>
                <button className="rounded-full border h-8 border-red-500 my-2 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                  追蹤
                </button>
              </li>
              <li className="grid grid-cols-4 w-full py-1">
                <div className="col-span-3 flex">
                  <Avatar></Avatar>
                  <div className="px-2">
                    <p>Rj</p>
                    <p className="line-clamp-2">
                      ng duis excepteur esse in duis nostrud occaecat mollit incididunt desaccaecat
                    </p>
                  </div>
                </div>
                <button className="rounded-full border  border-red-500 my-2 h-8 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                  追蹤
                </button>
              </li>
              <li className="grid grid-cols-4 w-full py-1">
                <div className="col-span-3 flex">
                  <Avatar></Avatar>
                  <div className="px-2">
                    <p>Amy</p>
                    <p className="line-clamp-2">我是一位熱愛設計的設計師</p>
                  </div>
                </div>
                <button className="rounded-full border h-8 border-red-500 my-2 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                  追蹤
                </button>
              </li>
            </ul>
          </div>
          {/* FIXME:熱門標籤資料 */}
          <div className="my-5 px-2">
            <div className="text-base">熱門標籤</div>
            <div className="flex flex-wrap gap-2">
              <p className="border rounded-lg border-gray-500 text-slate-900 dark:text-white px-2">ui</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
