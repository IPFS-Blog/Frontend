import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useClipboard } from "use-clipboard-copy";

import { apiUserGetCreaterArticle, apiUserGetCreaterData, apiUserGetUserData } from "@/components/api";
import ArticleItem from "@/components/article/comment/ArticleItem";
import Card from "@/components/users/Card";
import Editprofile from "@/components/users/EditProfile";
import UserWallet from "@/components/users/UserWallet";
import { setLogin } from "@/store/UserSlice";

export default function Users({ userData, IsUser, IsCreater, Articles }: any) {
  // TODO: API function
  const dispatch = useDispatch();
  useEffect(() => {
    // 登入狀態
    if (IsUser) dispatch(setLogin(JSON.stringify(userData)));
  }, [IsUser, dispatch, userData]);

  //TODO: UI function
  const { copy } = useClipboard();

  return (
    <div className="my-2 h-auto w-full">
      <div className="flex h-auto w-full justify-around">
        {/* FIXME:要 Card 縮小後要變另外一種*/}
        <div className="px-5">
          <Card CreaterAddress={userData.address} />
        </div>
        <div className="w-auto flex-auto">
          <dl className="mx-auto grid grid-cols-3 p-3 text-gray-900 sm:grid-cols-3 sm:px-1 xl:grid-cols-3">
            <div className="flex flex-col p-2 text-center">
              <dt className="select-none text-base dark:text-gray-200">所有文章</dt>
              <dd className="select-none text-gray-600 dark:text-gray-300">50</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="select-none text-base dark:text-gray-200">粉絲</dt>
              <dd className="select-none text-gray-600 dark:text-gray-300">40</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="select-none text-base dark:text-gray-200">追蹤中</dt>
              <dd className="select-none text-gray-600 dark:text-gray-300">20</dd>
            </div>
          </dl>
          <dl>
            <div className="flex flex-col p-2 text-center">
              <div className="mx-10 flex min-w-fit items-center justify-center rounded-lg bg-gray-200 py-2 px-4">
                <p className="select-all px-2 text">{userData.address}</p>
                <div
                  className="h-10 w-10 rounded-lg bg-gray-100 p-1 hover:bg-gray-300 dark:bg-gray-400 dark:text dark:hover:bg-gray-500"
                  onClick={() => {
                    copy(userData.address);
                  }}
                >
                  <ContentCopyRoundedIcon />
                </div>
              </div>

              {!IsCreater ? (
                // TODO:私人:編輯個人資料、個人錢包
                <div>
                  <div className="my-1">
                    <Editprofile />
                  </div>
                  <div className="my-1">
                    <UserWallet />
                  </div>
                </div>
              ) : (
                // TODO:公開:追蹤按鈕以及打賞
                <div className="flex flex-row justify-center p-2 text-center">
                  <button className="mx-2 rounded border border-red-500 py-2 px-20 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                    追蹤
                  </button>

                  <button className="mx-2 rounded border border-green-500 py-2 px-20 font-semibold text-green-500 hover:bg-green-500 hover:text-white">
                    打賞
                  </button>
                </div>
              )}
            </div>
          </dl>
        </div>
      </div>
      {/* //TODO:Menu */}
      {!IsCreater ? (
        // TODO:私人:所有、收藏、瀏覽紀錄、按讚紀錄
        <menu className="my-5 mx-2 flex justify-between bg-blue-200 px-1 text-lg">
          <ul className="my-2 flex h-full items-center">
            <li className="w-28 text-center">
              <a
                href="#"
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                所有
              </a>
            </li>
            <li className="w-28 text-center">
              <a
                href="#"
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                收藏
              </a>
            </li>
            <li className="w-28 text-center">
              <a
                href="#"
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                瀏覽紀錄
              </a>
            </li>
            <li className="w-28 text-center">
              <a
                href="#"
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                按讚紀錄
              </a>
            </li>
          </ul>
        </menu>
      ) : (
        <menu className="my-5 mx-2 flex justify-between bg-blue-200 py-3 px-1">
          <ul className="flex h-full items-center">
            <li>
              <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                公開瀏覽
              </a>
            </li>
          </ul>
        </menu>
      )}
      <main className="my-2 grid w-full grid-cols-12 gap-x-16 px-2">
        <ul className="col-span-8" role="list">
          {Articles.length != 0 &&
            Articles.map((item: any) => {
              const { id, title, subtitle, updateAt } = item;
              return (
                <ArticleItem
                  username={userData.name}
                  key={id}
                  id={id}
                  title={title}
                  subtitle={subtitle}
                  updateAt={updateAt}
                />
              );
            })}
        </ul>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const match = context.req.headers.cookie?.match(/UserJWT=([^;]+)/);
  const jwt = match ? match[1] : null;
  const url = context.req.url.substring(1);
  let userData = { id: 0, name: "", address: "", email: "", photo: "" };
  let IsUser = true;
  let IsCreater = true;
  let NotFound = false;
  // 判斷是否登入狀態
  if (jwt) {
    try {
      const res = await apiUserGetUserData(jwt);
      userData = res.data.userData;
      IsCreater = url != userData.name ? true : false;
    } catch (error: any) {
      IsUser = false;
    }
  } else IsUser = false;

  // 查詢創作者資料
  if (IsCreater) {
    await apiUserGetCreaterData(url)
      .then(res => {
        userData = res.data.userData;
      })
      .catch(() => {
        NotFound = true;
      });
  }
  const Articles = await apiUserGetCreaterArticle(userData.name);
  // 找不到使用者
  if (NotFound)
    return {
      notFound: true,
    };
  else return { props: { userData, IsUser, IsCreater, Articles: Articles.data } };
};
