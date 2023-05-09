import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useClipboard } from "use-clipboard-copy";

import { apiUserGetCreaterData, apiUserGetUserData } from "@/components/api";
import Card from "@/components/users/Card";
import Editprofile from "@/components/users/EditProfile";
import UserWallet from "@/components/users/UserWallet";
import { setLogin } from "@/store/UserSlice";

export default function Users({ userData, IsUser, IsCreater }: any) {
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
                className="inline-flex w-full justify-center py-2 px-5"
              >
                <p className="px-2 underline decoration-blue-500 hover:underline hover:decoration-blue-200">
                  {userData.address}
                </p>
                <ContentCopyRoundedIcon />
              </button>

              {!IsCreater ? (
                // TODO:私人:編輯個人資料、個人錢包
                <div>
                  <div className="text-gray-600">
                    <Editprofile />
                  </div>
                  <UserWallet />
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

      {!IsCreater ? (
        // TODO:私人:所有、收藏、瀏覽紀錄、按讚紀錄
        <menu className="my-5 mx-2 flex justify-between bg-blue-200 py-3 px-1">
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
  // 找不到使用者
  if (NotFound)
    return {
      notFound: true,
    };
  else return { props: { userData, IsUser, IsCreater } };
};
