import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { apiArticleTakeArticle, apiUserGetUserData } from "@/components/api";
import Comment from "@/components/article/comment/Comment";
import DonateButton from "@/components/users/DonateButton";
import { setLogin } from "@/store/UserSlice";

export default function Article({ userData, IsUser, article, createrData }: any) {
  // TODO: Handle funtion
  const dispatch = useDispatch();
  useEffect(() => {
    // 登入狀態
    if (IsUser) dispatch(setLogin(JSON.stringify(userData)));
  }, [IsUser, dispatch, userData]);
  // const [label, setLabel] = useState(""); // 添加標籤

  // TODO: UI funtion
  return (
    <div className="my-2 grid w-full grid-cols-12 gap-x-16 px-2">
      {/* 單一文章 */}
      <div className="col-span-8 text-base">
        <div className="my-2 flex flex-row items-center justify-between rounded border border-blue-200 p-2">
          {/* TODO: 文章擁有者資料 頭貼、名稱 */}
          <div className="flex flex-row items-center">
            <Avatar className="h-auto w-10 rounded-full" src={createrData.photo} alt="not find Avatar" />
            <div className="px-2">
              <div>{createrData.username}</div>
            </div>
          </div>
          <button>
            <ArrowOutwardOutlinedIcon />
          </button>
        </div>
        <div className="my-2 rounded border border-blue-200">
          {/* TODO: 文章資料 */}
          <div className="p-2">
            <h1 className="text-3xl font-semibold">{article.title}</h1>
            <h3 className="text-lg">{article.subtitle}</h3>
            <div>{article.contents}</div>
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
              {/* 打賞 */}
              <DonateButton
                onDonate={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
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
              <p className="mx-1 font-mono">{article.updateAt.substr(0, 10)}</p>
            </div>
          </div>
          {/* TODO: 使用者頭像、名稱 */}
          {/* 輸入留言 */}
          <form>
            <div className="flex items-center bg-gray-50 px-3 py-1 dark:bg-gray-700">
              <Avatar className="h-auto w-10 rounded-full" src={userData.photo} alt="not find Avatar" />
              <p className="mx-2">{userData.name}</p>
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
          <Avatar className="h-auto w-1/2 rounded-full" src={createrData.photo} alt="not find Avatar" />
        </div>
        <div className="text-center">
          {/* ${Username} */}
          <div className="my-2 px-2">{createrData.username}</div>
          {/* FIXME: 標籤 */}
          {/*Label*/}
          {/* <span className="inline-grid grid-cols-3 gap-1">{label}</span> */}
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
          {/* <span className="flex flex-wrap gap-2">{label}</span> */}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  // 查看是否登入狀態
  const match = context.req.headers.cookie?.match(/UserJWT=([^;]+)/);
  const jwt = match ? match[1] : null;
  let userData = { id: 0, name: "", address: "", email: "", photo: "" };
  let IsUser = true;
  // 判斷是否登入狀態
  if (jwt) {
    try {
      const res = await apiUserGetUserData(jwt);
      userData = res.data.userData;
    } catch (error: any) {
      IsUser = false;
    }
  } else IsUser = false;

  // 查詢文章
  const ArticleUrl = context.req.url.split("/")[2];
  let createrData = { id: 0, username: "", address: "", email: "", photo: "", updateAt: "" };
  let article = { title: "", subtitle: "", contents: "" };

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
  return { props: { userData, IsUser, article, createrData } };
};
