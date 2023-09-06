import { Avatar } from "@mui/material";

import { apiArticleTakeAllArticle } from "@/components/api";
import ArticleItem from "@/components/article/ArticleItem";

export default function Home(props: any) {
  return (
    <>
      {/* FIXME: 要判斷熱門文章、最新文章 顯示 文章項目 */}
      <div className="mb-4 mt-2 border-b border-gray-400 dark:border-gray-700">
        <ul className="-mb-px flex flex-wrap text-center text-sm font-medium">
          <li className="mr-2">
            <button className="inline-block rounded-t-md border-b-4 border-transparent p-4 text-gray-700 hover:border-b-4 hover:border-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500 dark:hover:text-gray-100">
              最熱門文章
            </button>
          </li>
          <li className="mr-2">
            <button className="inline-block rounded-t-lg border-b-4 border-transparent p-4 text-gray-700 hover:border-b-4 hover:border-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-500 dark:hover:text-gray-100">
              最新文章
            </button>
          </li>
        </ul>
      </div>

      <main className="grid laptop:my-2 laptop:w-full laptop:grid-cols-12 laptop:gap-x-16 laptop:px-2">
        <ul className="col-span-8" role="list">
          {props.Articles != null &&
            props.Articles.articles.map((item: any) => {
              const { id, title, subtitle, updateAt } = item;
              const { username, picture } = item.user;
              return (
                <ArticleItem
                  username={username}
                  picture={picture}
                  key={id}
                  id={id}
                  title={title}
                  subtitle={subtitle}
                  updateAt={updateAt}
                />
              );
            })}
        </ul>
        {/* FIXME: Lin 右側欄考慮做成 components */}
        <div className="invisible laptop:visible laptop:col-span-4">
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
      </main>
    </>
  );
}
export const getServerSideProps = async () => {
  try {
    const Articles = await apiArticleTakeAllArticle("");

    return { props: { Articles: Articles.data } };
  } catch {
    return { props: { Articles: null } };
  }
};
