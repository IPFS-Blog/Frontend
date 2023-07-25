import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

import FailAlert from "@/components/alert/Fail";
import SucessAlert from "@/components/alert/Sucess";
import { _apiCheckJwt, apiArticleCommentCreate, apiArticleTakeAllArticle } from "@/components/api";
const CreateComment = (props: any) => {
  // TODO: Handle funtion
  const [articleid] = useState(props.articleid);
  const [Comment, setComment] = useState(""); // 留言
  const [success, setSuccess] = useState(false);
  const [fail, setFailure] = useState(false);
  async function Create() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    const articleId = Number(articleid);
    //console.log(Comment);
    apiArticleCommentCreate(jwt, articleId, Comment)
      .then(async () => {
        setFailure(false);
        setSuccess(true);
        await apiArticleTakeAllArticle("?aid=" + props.articleid)
          .then(async res => {
            const { comments } = res.data.article;
            props.setComments(comments);
          })
          .catch(() => {
            return {
              notFound: true,
            };
          });
      })
      .catch(() => {
        setSuccess(false);
        setFailure(true);
        //console.log("錯誤:", error);
      });
    //axios.post("http://192.168.0.16:3000/api/v1/articles/1/comment", { comment: Comment });
  }

  return (
    <div>
      <div className="flex items-center bg-gray-50 px-3 py-1 dark:bg-gray-700">
        <Avatar className="h-auto w-10 rounded-full" src={props.picture} alt="not find Avatar" />
        <p className="mx-2">{props.username}</p>
        <textarea
          id="chat"
          className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="輸入留言..."
          onChange={e => setComment(e.target.value)}
        ></textarea>
        <button
          //type="submit"
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
          onClick={Create}
        >
          <SendIcon />
        </button>
      </div>
      {success && <SucessAlert message="留言成功" />}
      {fail && <FailAlert message="留言失敗" />}
    </div>
  );
};

export default CreateComment;
