import {
  ChevronLeft,
  ChevronRight,
  DriveFileRenameOutline,
  EditOff,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import MarkdownIt from "markdown-it";
import { useRouter } from "next/router";
import React, { useState } from "react";

import FailAlert from "@/components/alert/Fail";
import SucessAlert from "@/components/alert/Sucess";
import { _apiCheckJwt, apiArticleCreate } from "@/components/api";
import styles from "@/styles/MarkdownEditor.module.css";

const MarkdownEditor = () => {
  //TODO: Handle function
  const [title, setTitle] = useState(""); // 標題
  const [subtitle, setSubtitle] = useState(""); // 副標題
  const [markdown, setMarkdown] = useState(""); // 內文
  const [release, setrelease] = useState(false); // release狀態
  const router = useRouter();

  const ArticleCreate = async () => {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    const data = { title, subtitle, contents: markdown, release };
    apiArticleCreate(jwt, data)
      .then(() => {
        if (release) {
          setSuccessMessage("上傳 " + title + " 發布成功");
        } else {
          setSuccessMessage("另存 " + title + " 為草稿成功");
        }
        setSuccessAlert(true);
        setTitle("");
        setSubtitle("");
        setMarkdown("");
        //FIXME: 等後台合進來後就可以導到後台
        router.push("./");
        // router.push("/Dashboard"); //回到後台查看自己草稿
      })
      .catch(() => {
        setFailMessage("失敗，請再重新試試（如有問題可以向平台反映）。");
        setFailAlert(true);
      });
  };

  //TODO: UI function
  const [edit, setedit] = useState(true);
  const [preview, setpreview] = useState(true);
  const [fail, setFailAlert] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [success, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleMarkdownChange = (event: any) => {
    setMarkdown(event.target.value);
  };

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const renderedHTML = md.render(markdown);

  return (
    <div
      className={`m-2 grid h-full w-auto grid-cols-2 gap-0 rounded-lg bg-gray-300 dark:border-gray-700 dark:bg-gray-700${styles["markdown-preview"]}`}
    >
      <div className="col-span-2 flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
        <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
          <div className="flex items-center space-x-1 sm:pr-4">
            {edit ? (
              <button
                type="button"
                className="cursor-pointer rounded bg-gray-200 p-2 text-gray-900"
                onClick={() => {
                  setpreview(true);
                  setedit(false);
                }}
              >
                <DriveFileRenameOutline />
              </button>
            ) : (
              <button
                type="button"
                className="cursor-pointer rounded bg-gray-200 p-2 text-gray-500"
                onClick={() => {
                  setpreview(false);
                  setedit(true);
                }}
              >
                <EditOff />
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-gray-200 p-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => {
                setpreview(true);
                setedit(true);
              }}
            >
              <ChevronLeft />
              <ChevronRight />
            </button>
            {preview ? (
              <button
                type="button"
                className="cursor-pointer rounded bg-gray-200 p-2 text-gray-900"
                onClick={() => {
                  setpreview(false);
                  setedit(true);
                }}
              >
                <Visibility />
              </button>
            ) : (
              <button
                type="button"
                className="cursor-pointer rounded bg-gray-200 p-2 text-gray-500"
                onClick={() => {
                  setpreview(true);
                  setedit(false);
                }}
              >
                <VisibilityOff />
              </button>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mx-1 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            onClick={() => {
              ArticleCreate();
              setrelease(true);
            }}
          >
            發布
          </button>
          <button
            type="submit"
            className="mx-1 inline-flex items-center rounded-lg bg-blue-400 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            onClick={() => {
              ArticleCreate();
              setrelease(false);
            }}
          >
            草稿
          </button>
        </div>
      </div>
      {edit && preview ? (
        <>
          <div className="no-scrollbar resize-none overflow-auto border-r-4 border-gray-300 bg-white text-lg text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400">
            <textarea
              className="h-auto w-full resize-none border-0 px-2 pt-2 text-5xl text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              id="title"
              name="title"
              value={title}
              placeholder="標題"
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="h-auto w-full resize-none border-0 px-2 text-3xl text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              id="subtitle"
              name="subtitle"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              placeholder="副標題"
            />
            <textarea
              className="h-full w-full resize-none rounded-lg bg-white p-2 text-lg text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              id="content"
              name="content"
              value={markdown}
              onChange={handleMarkdownChange}
              placeholder="內文"
            />
          </div>

          <div className="no-scrollbar resize-none overflow-auto bg-gray-200 text-lg text-gray-800 focus:outline-none dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-400">
            <div className="w-full resize-none border-0 bg-gray-200 p-2 text-6xl text-gray-800 focus:outline-none dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-400">
              {title}
            </div>
            <div className="w-full resize-none border-0 bg-gray-200 p-2 text-3xl text-gray-800 focus:outline-none dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-400">
              {subtitle}
            </div>
            <div
              className={`h-full min-h-screen whitespace-pre-line bg-gray-200 p-2 text-lg text-gray-800 ${styles["markdown-preview"]} dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-500`}
              dangerouslySetInnerHTML={{ __html: renderedHTML }}
            />
          </div>
        </>
      ) : edit ? (
        <div className="no-scrollbar col-span-2 h-screen resize-none overflow-auto border-gray-500 bg-white text-lg text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400">
          <textarea
            className="h-auto w-full resize-none border-0 px-2 pt-2 text-6xl text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
            id="title"
            name="title"
            value={title}
            placeholder="標題"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="h-auto w-full resize-none border-0 px-2 text-3xl text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
            id="subtitle"
            name="subtitle"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            placeholder="副標題"
          />
          <textarea
            className="h-full w-full resize-none rounded-lg bg-white p-2 text-lg text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
            id="content"
            name="content"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="內文"
          />
        </div>
      ) : (
        <div className="no-scrollbar col-span-2 resize-none overflow-auto bg-gray-200 text-lg text-gray-800 focus:outline-none dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-400">
          <div className="w-full resize-none border-0 bg-gray-200 p-2 text-6xl text-gray-800 focus:outline-none dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-400">
            {title}
          </div>
          <div className="w-full resize-none border-0 bg-gray-200 p-2 text-3xl text-gray-800 focus:outline-none dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-400">
            {subtitle}
          </div>
          <div
            className={`h-full min-h-screen whitespace-pre-line bg-gray-200 p-2 text-lg text-gray-800 ${styles["markdown-preview"]} dark:bg-gray-500 dark:text-white dark:placeholder:text-gray-500`}
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
          />
        </div>
      )}
      {success && <SucessAlert message={successMessage} />}
      {fail && <FailAlert message={failMessage} />}
    </div>
  );
};

export default MarkdownEditor;
