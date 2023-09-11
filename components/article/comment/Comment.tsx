import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import FailAlert from "@/components/alert/Fail";
import SucessAlert from "@/components/alert/Sucess";
import {
  _apiCheckJwt,
  apiArticleCommentDelete,
  apiArticleCommentEdit,
  apiArticleTakeAllArticle,
  apiCommentLike,
  apiCommentLikesRecord,
} from "@/components/api";

const options = ["Edit", "Delete"];

const Comment = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [DeletedialogOpen, setDeleteDialogOpen] = useState(false);
  const User = useSelector((state: any) => state.User);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //UI function
  const [likeSuccess, setLikeSuccess] = useState(false);
  const [commentLike, setCommentLike] = useState(false);

  function handleOptionClick(option: any) {
    if (option === "Edit") {
      handleEditClick();
    } else if (option === "Delete") {
      handleDeleteClick();
    } else {
      handleClose();
    }
  }
  const handleEditClick = () => {
    handleClose();
    setDialogOpen(true);
  };
  const handleDeleteClick = () => {
    handleClose();
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteDialogOpen(false);
  };
  const [articleId] = useState(props.articleId);
  const [Comment, setComment] = useState(props.contents);
  const [success, setSuccess] = useState(false);
  const [fail, setFailure] = useState(false);
  const [Deletesuccess, setDeleteSuccess] = useState(false);
  const [Deletefail, setDeleteFailure] = useState(false);
  const [edit, setEdit] = useState(false);
  /* 編輯留言 */
  async function Edit() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
    const id = Number(articleId);
    const cid = props.id;
    if (jwt != null) {
      apiArticleCommentEdit(jwt, id, cid, Comment)
        .then(() => {
          setFailure(false);
          setSuccess(true);
          setEdit(true);
          handleDialogClose();
        })
        .catch(() => {
          setSuccess(false);
          setFailure(true);
          handleDialogClose();
        });
    } else {
      window.alert("請先登入");
    }
  }
  /* 刪除留言 */
  async function Delete() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
    const id = Number(articleId);
    const cid = props.id;
    if (jwt != null) {
      apiArticleCommentDelete(jwt, id, cid)
        .then(async () => {
          setDeleteFailure(false);
          setDeleteSuccess(true);
          setEdit(true);
          handleDialogClose();
          const data = { aid: articleId };
          await apiArticleTakeAllArticle(data)
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
          setDeleteSuccess(false);
          setDeleteFailure(true);
          handleDialogClose();
        });
    } else {
      window.alert("請先登入");
    }
  }

  /* 顯示留言 */
  const showComment = () => {
    if (edit) {
      return <p className="-mt-4 text-gray-500">{Comment}</p>;
    } else {
      return <p className="-mt-4 text-gray-500">{props.contents}</p>;
    }
  };
  return (
    <div>
      <div>
        <div className="relative mb-8 grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700 dark:text-slate-300">
          <div className="relative flex gap-4">
            <Avatar className="h-10 w-10 rounded-full border" src={props.picture} alt="not found" />
            <div className="flex w-full flex-col">
              <div className="flex flex-row justify-between">
                <p className="relative overflow-hidden truncate whitespace-nowrap text-xl">{props.username}</p>
              </div>
              <p className="text-sm text-gray-400">{props.updateAt.substr(0, 10)}</p>
            </div>
            {User.profile.login ? (
              <div className="grid grid-cols-2 place-items-center">
                <button
                  type="submit"
                  onClick={async () => {
                    let jwt = "";
                    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
                    if (jwt.trim() !== null) {
                      let CommentLike = false;
                      const data = { aid: articleId };
                      await apiCommentLikesRecord(jwt, data).then((res: any) => {
                        const CommentLikeRecord = res.data.comments;
                        if (CommentLikeRecord !== null) {
                          // 取得留言是否按過讚
                          CommentLike = CommentLikeRecord.some((comment: any) => {
                            const isMatching = comment.number === props.id;
                            return isMatching;
                          });
                        }
                        setCommentLike(CommentLike);
                      });

                      // 留言按讚/取消讚成功
                      await apiCommentLike(jwt, articleId, props.id, !CommentLike).then(() => {
                        setLikeSuccess(true);
                        setTimeout(() => {
                          setLikeSuccess(false);
                        }, 3000);
                      });
                      await apiArticleTakeAllArticle(data)
                        .then(async res => {
                          const { comments } = res.data.article;
                          props.setComments(comments);
                        })
                        .catch(() => {
                          return {
                            notFound: true,
                          };
                        });
                    }
                  }}
                >
                  {likeSuccess ? (
                    <span
                      className={`pointer-events-none absolute bottom-full z-10 mb-2 ml-16 rounded-lg py-2 px-3 text-center text-xs ${
                        commentLike ? " bg-gray-100 text-gray-800" : "bg-blue-500 text-white"
                      }`}
                    >
                      {commentLike ? "- 1" : "+ 1"}
                    </span>
                  ) : null}
                  <ThumbUpOutlinedIcon className="m-1 inline-flex cursor-pointer justify-center rounded-full p-1 text-4xl text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100" />
                </button>
                <p className="inline-flex justify-center p-2">{props.like}</p>
              </div>
            ) : (
              <div className="flex">
                <div className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 dark:text-blue-500">
                  <ThumbUpOutlinedIcon />
                </div>
                <p className="inline-flex justify-center p-2">{props.like}</p>
              </div>
            )}
            {User.profile.username == props.username ? (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "20ch",
                    },
                  }}
                >
                  {options.map(option => (
                    <MenuItem key={option} selected={option === "Pyxis"} onClick={() => handleOptionClick(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : null}
          </div>
          {showComment()}
        </div>
        {/* 彈窗部分 */}
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          aria-labelledby="responsive-dialog-title"
          className="fixed h-screen w-screen "
        >
          {/* 變更留言 */}
          <DialogTitle id="responsive-dialog-title" className="flex justify-center bg-gray-200 font-semibold">
            變更留言
          </DialogTitle>
          <DialogContent className="flex bg-gray-200 md:w-full lg:w-96">
            <textarea
              id="chat"
              className="mx-4  w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="輸入留言..."
              value={Comment}
              onChange={e => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <button
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
            onClick={Edit}
          >
            <SendIcon />
            <p>變更留言</p>
          </button>
        </Dialog>
        {success && <SucessAlert message="留言成功" />}
        {fail && <FailAlert message="留言失敗" />}
      </div>
      <div>
        <Dialog
          open={DeletedialogOpen}
          onClose={handleDialogClose}
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          aria-labelledby="responsive-dialog-title"
          className="fixed h-screen w-screen "
        >
          <DialogContent className="flex bg-gray-200 md:w-full lg:w-96"></DialogContent>
          <button
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
            onClick={Delete}
          >
            <p>確定刪除</p>
          </button>
        </Dialog>
        {Deletesuccess && <SucessAlert message="刪除成功" />}
        {Deletefail && <FailAlert message="刪除失敗" />}
      </div>
    </div>
  );
};

export default Comment;
