import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

import { _apiCheckJwt, apiArticleCommentCreate } from "@/components/api";

const CreateComment = (props: any) => {
  // TODO: Handle funtion
  const [articleid] = useState(props.articleid);
  const [Comment, setComment] = useState(""); // 留言

  async function Create() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    const articleId = Number(articleid);
    console.log(typeof articleId);
    const data = String({ Comment });
    console.log(jwt);
    apiArticleCommentCreate(jwt, articleId, data)
      .then(() => {
        console.log("ABC");
      })
      .catch((error: any) => {
        console.log(error);
      });
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
    </div>
  );
};

export default CreateComment;
