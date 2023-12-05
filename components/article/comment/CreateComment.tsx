import "react-toastify/dist/ReactToastify.css";

import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { _apiCheckJwt, apiArticleCommentCreate, apiArticleTakeAllArticle } from "@/components/api";
const CreateComment = (props: any) => {
  // TODO: Handle function
  const [articleid] = useState(props.articleid);
  const [Comment, setComment] = useState(""); // 留言
  async function Create() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    const articleId = Number(articleid);
    apiArticleCommentCreate(jwt, articleId, Comment)
      .then(async () => {
        toast.success("新增留言成功", {
          style: {
            boxShadow: "none",
          },
          theme: theme ? "light" : "dark",
        });
        const data = { aid: articleId };
        await apiArticleTakeAllArticle(data)
          .then(async res => {
            const { comments } = res.data.article;
            props.setComments(comments);
            setComment("");
          })
          .catch(() => {
            return {
              notFound: true,
            };
          });
      })
      .catch(() => {
        toast.error("新增留言失敗", {
          style: {
            boxShadow: "none",
          },
          theme: theme ? "light" : "dark",
        });
      });
  }

  //UI function
  const { theme } = useTheme();

  return (
    <div className="mb-2">
      <div className="flex items-center bg-gray-50 px-3 py-1 dark:bg-gray-700">
        <Avatar className="h-auto w-10 rounded-full" src={props.picture} alt="not find Avatar" />
        <p className="mx-2">{props.username}</p>
        <textarea
          id="chat"
          className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="輸入留言..."
          value={Comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
        <button
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
          onClick={Create}
        >
          <SendIcon />
        </button>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
};

export default CreateComment;
