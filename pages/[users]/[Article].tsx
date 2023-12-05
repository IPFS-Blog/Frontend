import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Avatar from "@mui/material/Avatar";
import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  _apiCheckJwt,
  apiArticleLike,
  apiArticleLikesRecord,
  apiArticleTakeAllArticle,
  apiBookMarkAdd,
  apiBookMarkAddReord,
  apiBookMarkDelete,
} from "@/components/api";
import Comment from "@/components/article/comment/Comment";
import CreateComment from "@/components/article/comment/CreateComment";
import DonateButton from "@/components/users/DonateButton";
import Follow from "@/components/users/Follow";
import { update } from "@/store/CreaterSlice";
import styles from "@/styles/MarkdownEditor.module.css";
export default function Article(props: any) {
  // TODO: Handle function
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User);
  const [comments, setComments] = useState(props.comment);
  const [likeNumber, setlikeNumber] = useState(props.article.likes);
  useEffect(() => {
    // TODO: 文章創作者資料
    dispatch(update(JSON.stringify(props.createrData)));
  }, [dispatch, props.createrData]);

  // TODO: UI function
  const { contents } = props.article;
  const [likeSuccess, setLikeSuccess] = useState(false);
  const [articleLike, setArticleLike] = useState(false);
  const [bookmark, setbookmark] = useState(false);
  const [bookmarksuccess, setbookmarksuccess] = useState(false);
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const renderedHTML = md.render(contents);
  return (
    // 單一文章
    <div className="grid laptop:my-2 laptop:w-full laptop:grid-cols-12 laptop:gap-x-16 laptop:px-2">
      <div className="col-span-8 text-base">
        <a
          href={"/" + props.createrData.username}
          className="my-2 flex flex-row items-center justify-between rounded border border-blue-200 bg-gray-50 p-2 dark:bg-gray-700"
        >
          {/* TODO: 文章擁有者資料 頭貼、名稱 */}
          <div className="flex flex-row items-center">
            <Avatar src={props.createrData.picture} alt="not find Avatar" />
            <div className="px-2">
              <div>{props.createrData.username}</div>
            </div>
            <div className="ml-10">
              {props.createrData.id != User.profile.id ? <Follow subscriberId={props.createrData.id} /> : null}
            </div>
          </div>
          <button>
            <ArrowOutwardOutlinedIcon />
          </button>
        </a>
        <div className="my-2 rounded border border-blue-200 bg-gray-50 dark:bg-gray-700">
          {/* TODO: 文章資料 */}
          <div className="p-2">
            <h1 className="text-5xl font-semibold text-slate-900 dark:text-white">{props.article.title}</h1>
            <h3 className="mt-3 mb-4 text-2xl font-semibold text-slate-700 dark:text-slate-200">
              {props.article.subtitle}
            </h3>
            <div
              className={`whitespace-pre-line text-lg text-slate-600 ${styles["markdown-preview"]} break-all dark:bg-gray-700 dark:text-slate-300`}
              dangerouslySetInnerHTML={{ __html: renderedHTML }}
            />
          </div>
          {/* 文章內覽列 */}
          {/* FIXME: 針對文章喜歡、讚賞、分享、收藏 */}
          {/* FIXME: 響應式 table: phone: */}
          <div className="grid items-center gap-2 bg-gray-100 p-2 dark:bg-gray-800">
            <div className="col-start-1 col-end-3 flex tablet:col-span-1 tablet:col-start-1">
              {/* 喜歡 */}
              {User.profile.login ? (
                <button
                  className="tabelet:my-0 tabelet:py-2 tabelet:px-10 relative my-2 mr-2 rounded border border-red-500 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white tablet:mx-2 tablet:px-5"
                  onClick={async () => {
                    let jwt = "";
                    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
                    if (jwt.trim() !== "" && props.ArticleUrl != null) {
                      let ArticleLike = false;
                      await apiArticleLikesRecord(jwt).then((res: any) => {
                        const ArticleLikeRecord = res.data.article;
                        if (ArticleLikeRecord !== null) {
                          // 取得文章是否按過讚
                          ArticleLike = ArticleLikeRecord.some((article: any) => {
                            const isMatching = article.id.toString() === props.ArticleUrl;
                            return isMatching;
                          });
                        }
                        setArticleLike(ArticleLike);
                      });
                      // 文章按讚/取消讚成功
                      await apiArticleLike(jwt, props.ArticleUrl, !ArticleLike).then(() => {
                        setLikeSuccess(true);
                        setTimeout(() => {
                          setLikeSuccess(false);
                        }, 3000);
                      });
                      const data = { aid: props.ArticleUrl };
                      await apiArticleTakeAllArticle(data)
                        .then(async res => {
                          const { likes } = res.data.article;
                          setlikeNumber(likes);
                        })
                        .catch(() => {
                          return {
                            notFound: true,
                          };
                        });
                    }
                  }}
                >
                  <FavoriteBorderOutlinedIcon />
                  <span>Like {likeNumber}</span>
                  {likeSuccess ? (
                    <span
                      className={`pointer-events-none absolute bottom-full -left-1/2 z-10 mb-2 ml-16 rounded-lg py-2 px-3 text-center text-xs ${
                        articleLike ? " bg-gray-800 text-gray-100" : "bg-red-500 text-white"
                      }`}
                    >
                      {articleLike ? "unLike" : "Like !"}
                    </span>
                  ) : null}
                </button>
              ) : (
                <button className="group relative flex rounded border border-red-500 py-2 px-10 font-semibold text-red-500 hover:bg-red-500 hover:text-white tablet:mx-2 tablet:px-5">
                  <FavoriteBorderOutlinedIcon />
                  <span>Like {likeNumber}</span>
                  <span
                    className="pointer-events-none absolute bottom-full -left-1/2 z-10 mb-2 ml-16 rounded-lg bg-gray-300 py-2 px-3 text-center text-xs text-gray-800 opacity-0
                      group-hover:opacity-100"
                  >
                    想點擊 Like 給創作者，請先登入
                  </span>
                </button>
              )}
              {User.profile.login ? <DonateButton /> : null}
            </div>
            <div className="col-span-1 col-end-7 flex flex-row items-center">
              {/* 分享 */}
              {/* <button className="mx-1 h-5 w-5 rounded-lg hover:bg-gray-500 hover:text-white">
                <IosShareOutlinedIcon />
              </button> */}
              {/* 收藏 */}
              {User.profile.login ? (
                <div className="flex items-center">
                  <button
                    className="relative mx-1 h-10 w-10 rounded-lg text-yellow-500 hover:bg-yellow-300 hover:text-white"
                    onClick={async () => {
                      let jwt = "";
                      await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
                      if (jwt.trim() !== "" && props.ArticleUrl != null) {
                        let BookMarkStatus = false;
                        await apiBookMarkAddReord(jwt).then((res: any) => {
                          const BookMarkAddReord = res.data.articles;
                          if (BookMarkAddReord !== null) {
                            BookMarkStatus = BookMarkAddReord.some((article: any) => {
                              const BookMarkAddMatching = article.articleId.id.toString() === props.ArticleUrl;
                              return BookMarkAddMatching;
                            });
                          }
                          setbookmark(BookMarkStatus);
                        });
                        if (BookMarkStatus) {
                          await apiBookMarkDelete(jwt, props.ArticleUrl)
                            .then(() => {
                              setbookmark(false);
                              setbookmarksuccess(true);
                              setTimeout(() => {
                                setbookmarksuccess(false);
                              }, 2000);
                            })
                            .catch(() => {
                              return {
                                notFound: true,
                              };
                            });
                        } else {
                          await apiBookMarkAdd(jwt, props.ArticleUrl)
                            .then(() => {
                              setbookmark(true);
                              setbookmarksuccess(true);
                              setTimeout(() => {
                                setbookmarksuccess(false);
                              }, 2000);
                            })
                            .catch(() => {
                              return {
                                notFound: true,
                              };
                            });
                        }
                      }
                    }}
                  >
                    {bookmark ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                    {bookmarksuccess ? (
                      <span
                        className={`pointer-events-none absolute bottom-full -left-1/2 z-10 mb-2 ml-2 w-24 rounded-lg p-2 text-center text-xs ${
                          !bookmark ? "bg-gray-800 text-gray-100" : "bg-red-500 text-white"
                        }`}
                      >
                        {bookmark ? "收藏成功" : "刪除收藏"}
                      </span>
                    ) : null}
                  </button>

                  <p className="m-1 flex font-mono">{props.article.updateAt.substr(0, 10)}</p>
                </div>
              ) : null}
            </div>
          </div>
          {/* 輸入留言 */}
          {User.profile.login ? (
            <CreateComment
              username={User.profile.username}
              picture={User.profile.picture}
              articleid={props.ArticleUrl}
              setComments={setComments}
            ></CreateComment>
          ) : null}

          <div className="h-1 w-full border-b-2 border-blue-200"></div>
          {/* 顯示留言 */}
          <div className="my-2">
            {comments.slice(1).map((comment: any) => {
              const { number, likes, contents, updateAt, user } = comment;
              return (
                <Comment
                  id={number}
                  articleId={props.ArticleUrl}
                  key={number}
                  like={likes}
                  contents={contents}
                  updateAt={updateAt}
                  username={user.username}
                  picture={user.picture}
                  setComments={setComments}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  // 查詢文章
  const ArticleUrl = context.req.url.split("/")[2];
  let createrData = { id: 0, username: "", address: "", email: "", picture: "" };
  let article = { title: "", subtitle: "", contents: "", updateAt: "", likes: 0 };
  const comment = [{ number: 0, likes: 0, contents: "", updateAt: "", user: {} }];
  const data = { aid: ArticleUrl || null };
  if (data.aid !== null && !context.req.url.includes("favicon.ico")) {
    await apiArticleTakeAllArticle(data)
      .then(async res => {
        const { title, subtitle, contents, updateAt, user, comments, likes } = res.data.article;
        createrData = user;
        const resarticle = {
          title,
          subtitle,
          contents,
          updateAt,
          likes,
        };
        article = resarticle;
        comment.push(...comments);
      })
      .catch(() => {
        return {
          notFound: true,
        };
      });

    return { props: { article, createrData, ArticleUrl, comment } };
  } else return { props: {} };
};
