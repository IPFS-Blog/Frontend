import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClipboard } from "use-clipboard-copy";

import { apiUserGetUserData } from "@/components/api";
import Card from "@/components/users/Card";
import { setLogin } from "@/store/UserSlice";

export default function Users({ userData, IsUser }: any) {
  // TODO: API function

  // 取路由名稱 用來判別是不是本人
  const router = useRouter();
  const [, route] = router.asPath.split("/");

  const dispatch = useDispatch();
  useEffect(() => {
    if (IsUser) dispatch(setLogin(JSON.stringify(userData)));
  }, [IsUser, dispatch, userData]);
  const User = useSelector((state: any) => state.User);
  // TODO: UI function
  const { copy } = useClipboard();

  return (
    <div className="h-auto w-full">
      <div className="flex h-auto w-full">
        {/* FIXME:要 Card 縮小後要變另外一種*/}
        <div className="w-64 flex-auto lg:w-3/4">
          <Card />
        </div>
        <div>
          <dl className="mx-auto grid grid-cols-3 p-3 text-gray-900 sm:grid-cols-3 sm:p-2 xl:grid-cols-3">
            <div className="flex flex-col p-2 text-center">
              <dt className="text-base">所有文章</dt>
              <dd className="text-gray-600 ">50</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="text-base">粉絲</dt>
              <dd className="text-gray-600 ">40</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="text-base">追蹤中</dt>
              <dd className="text-gray-600 ">20</dd>
            </div>
          </dl>
          <dl>
            <div className="flex flex-col p-2 text-center">
              <button
                onClick={() => {
                  copy(userData.address);
                }}
                className="inline-flex w-full justify-between rounded-lg bg-gray-300 py-2 px-5 text-black-100 hover:bg-gray-400"
              >
                <p className="pl-2">{userData.address}</p>
                <ContentCopyRoundedIcon />
              </button>

              {User.profile.name === route ? (
                // TODO:私人:編輯個人資料、個人錢包
                <div>
                  <p className="text-gray-600">編輯個人資料</p>
                  <p className="text-gray-600">個人錢包</p>
                </div>
              ) : (
                // TODO:公開:追蹤按鈕以及打賞
                <div className="flex flex-row justify-center p-2 text-center">
                  <button className="hover: ml-2 rounded border border-red-500 py-2 px-20 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                    追蹤
                  </button>

                  <button className="hover: rounded border border-green-500 py-2 px-20 font-semibold text-green-500 hover:bg-green-500 hover:text-white">
                    打賞
                  </button>
                </div>
              )}
            </div>
          </dl>
        </div>
      </div>

      {User.profile.name == route ? (
        // TODO:私人:所有、收藏、瀏覽紀錄、按讚紀錄
        <nav className="my-5 mx-2 flex justify-between bg-bule-200 py-3">
          <ul className="flex h-full items-center">
            <li>
              <a href="#" className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                所有
              </a>
            </li>
            <li>
              <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                收藏
              </a>
            </li>
            <li>
              <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                瀏覽紀錄
              </a>
            </li>
            <li>
              <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                按讚紀錄
              </a>
            </li>
          </ul>
        </nav>
      ) : (
        // FIXME: 公開內導覽列
        <h1>公開公開公開公開公開公開公開公開公開公開公開公開公開公開公開公開公開公開</h1>
      )}
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const match = context.req.headers.cookie.match(/UserJWT=([^;]+)/);
  const jwt = match ? match[1] : null;
  let userData = { id: 0, name: "", address: "", email: "", photo: "" };
  let IsUser = true;
  if (jwt) {
    try {
      const res = await apiUserGetUserData(jwt);
      userData = res.data.userData;
      IsUser = true;
    } catch (error: any) {
      IsUser = false;
    }
  } else IsUser = false;
  // 返回 jwt 值
  return { props: { userData, IsUser } };
};
