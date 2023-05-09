import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import ArticleItem from "@/components/article/comment/ArticleItem";
import { setLogin } from "@/store/UserSlice";

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
          <div className="grid grid-rows">
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
            <ul className="divide-y divide-blue-200">
              <li></li>
            </ul>
          </div>
          <div className="my-5 px-2">
            <div className="text-base">熱門標籤</div>
            {/* FIXME:熱門標籤資料 */}
            {/* <span className="flex flex-wrap gap-2">{label}</span> */}
          </div>
        </div>
      </main>
    </>
  );
}
