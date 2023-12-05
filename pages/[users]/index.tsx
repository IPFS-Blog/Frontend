import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClipboard } from "use-clipboard-copy";

import {
  _apiCheckJwt,
  apiArticleGetCreaterArticle,
  apiArticleLikesRecord,
  apiBookMarkAddReord,
  apiUserGetCreaterData,
  apiUserGetCreatorOwnFollowers,
  apiUserGetCreatorOwnSubscribers,
} from "@/components/api";
import ArticleItem from "@/components/article/ArticleItem";
import Card from "@/components/users/Card";
import DonateButton from "@/components/users/DonateButton";
import Editprofile from "@/components/users/EditProfile";
import Follow from "@/components/users/Follow";
import UserWallet from "@/components/users/UserWallet";
import { update } from "@/store/CreaterSlice";

interface Subscribers {
  id: number;
  username: string;
  picture: string;
}
interface Followers {
  id: number;
  username: string;
  picture: string;
}

export default function Users(props: any) {
  // TODO: Handle function
  const [IsPrivate, SetIsPrivate] = useState(false);
  const [menuList, setmenuList] = useState(props.Articles || null);
  const [createrData, setCreaterData] = useState(props.createrData || null);
  const [subscribers, setSubscribers] = useState<Subscribers[]>([]);
  const [followers, setFollowers] = useState<Followers[]>([]);
  const [menuID, setmenuID] = useState(1);
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User);
  useEffect(() => {
    // TODO: 創作者狀態
    if (props.createrData != null) {
      if (props.createrData.username == User.profile.username) SetIsPrivate(true);
      dispatch(update(JSON.stringify(props.createrData)));
    } else {
      window.alert("網站抓取資料錯誤");
    }
    async function follow() {
      let jwt = "";
      await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
      if (jwt != null) {
        apiUserGetCreatorOwnFollowers(jwt).then((res: any) => {
          setFollowers(res.data.followers);
        });
        apiUserGetCreatorOwnSubscribers(jwt).then((res: any) => {
          setSubscribers(res.data.subscribers);
        });
      }
    }
    follow();
  }, [User.profile.username, dispatch, props.IsCreater, props.createrData]);
  const menu = async (menuID: any) => {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
    setmenuID(menuID);
    //所有
    if (menuID == 1) {
      const url = props.url;
      if (url !== null) {
        // 查詢創作者資料
        await apiUserGetCreaterData(url)
          .then(res => {
            setCreaterData(res.data.userData);
          })
          .catch(() => {
            // 找不到使用者
          });

        if (createrData.username !== "") {
          const Articles = await apiArticleGetCreaterArticle(createrData.username);
          setmenuList(Articles.data.articles);
        }
      }
    }
    //收藏
    else if (jwt != null) {
      if (menuID == 2) {
        await apiBookMarkAddReord(jwt).then((res: any) => {
          setmenuList(res.data.articles);
        });
      }
      //瀏覽紀錄
      else if (menuID == 3) {
      }
      //按讚紀錄
      else if (menuID == 4) {
        await apiArticleLikesRecord(jwt).then((res: any) => {
          setmenuList(res.data.article);
        });
      }
    }
  };
  //TODO: UI function
  const { copy } = useClipboard();

  return (
    <div className="my-2 h-auto w-full">
      <div className="flex h-full w-full flex-row flex-wrap justify-around">
        <div className="h-full p-2  tablet:w-1/2 laptop:basis-1/2">
          <Card subscribers={subscribers.length} followers={followers.length} menuList={menuList.length} />
        </div>
        <div className="phone:h-full phone:w-auto phone:p-2">
          <dl className="mx-2 grid grid-cols-3 p-3 text-gray-900 sm:grid-cols-3 sm:px-1 xl:grid-cols-3">
            <div className="flex flex-col p-2 text-center">
              <dt className="select-none text-base dark:text-gray-200">所有文章</dt>
              <dd className="select-none text-gray-600 dark:text-gray-300">{menuList.length}</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="select-none text-base dark:text-gray-200">粉絲</dt>
              <dd className="select-none text-gray-600 dark:text-gray-300">{followers.length}</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="select-none text-base dark:text-gray-200">追蹤中</dt>
              <dd className="select-none text-gray-600 dark:text-gray-300">{subscribers.length}</dd>
            </div>
          </dl>
          <dl>
            <div className="flex flex-col p-2 text-center">
              <div className="hidden laptop:flex laptop:items-center laptop:justify-center laptop:rounded-lg laptop:bg-gray-200 laptop:p-2">
                <p className="select-all px-2 text">{props.createrData.address}</p>
                <div
                  className="h-10 w-10 rounded-lg bg-gray-100 p-1 hover:bg-gray-300 dark:bg-gray-400 dark:text dark:hover:bg-gray-500"
                  onClick={() => {
                    copy(props.createrData.address);
                  }}
                >
                  <ContentCopyRoundedIcon />
                </div>
              </div>

              {IsPrivate ? (
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
                  <Follow subscriberId={props.createrData.id} />
                  <DonateButton />
                </div>
              )}
            </div>
          </dl>
        </div>
      </div>
      {/* //TODO:Menu */}
      {IsPrivate ? (
        // TODO:私人:所有、收藏、瀏覽紀錄、按讚紀錄
        <menu className="my-5 mx-2 flex justify-between bg-blue-200 px-1 text-lg">
          <ul className="my-2 flex h-full items-center">
            <li className="w-28 text-center">
              <button
                onClick={() => menu(1)}
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                所有
              </button>
            </li>
            <li className="w-28 text-center">
              <button
                onClick={() => menu(2)}
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                收藏紀錄
              </button>
            </li>
            <li className="w-28 text-center">
              <button
                onClick={() => menu(3)}
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                瀏覽紀錄
              </button>
            </li>
            <li className="w-28 text-center">
              <button
                onClick={() => menu(4)}
                className="ml-4 select-none rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                按讚紀錄
              </button>
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

      <main className="my-2 w-full px-2">
        <ul role="list">
          {menuList != null &&
            menuList.length != 0 &&
            menuList.map((item: any) => {
              const { id, title, subtitle, updateAt, likes, createAt } =
                menuID.toString() == "2" ? item?.articleId || {} : item || {};
              return (
                <ArticleItem
                  username={props.createrData.username}
                  picture={props.createrData.picture}
                  key={id}
                  id={id}
                  title={title}
                  subtitle={subtitle}
                  updateAt={updateAt}
                  likes={likes}
                  menuID={menuID}
                  createAt={createAt}
                />
              );
            })}
        </ul>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const url = context.req.url.substring(1) || null;

  let createrData = { id: 0, username: "", address: "", email: "", picture: "" };
  if (url !== null && !context.req.url.includes("favicon.ico")) {
    // 查詢創作者資料
    await apiUserGetCreaterData(url)
      .then(res => {
        createrData = res.data.userData;
      })
      .catch(() => {
        // 找不到使用者
        return {
          notFound: true,
        };
      });
    if (createrData.username !== "") {
      const Articles = await apiArticleGetCreaterArticle(createrData.username);
      return { props: { createrData, Articles: Articles.data.articles, url } };
    }
    return { props: {} };
  }
};
