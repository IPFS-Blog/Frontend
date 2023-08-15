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

import FailAlert from "@/components/alert/Fail";
import SucessAlert from "@/components/alert/Sucess";
import { _apiCheckJwt, apiArticleCommentEdit } from "@/components/api";
const options = ["Edit", "Delete"];

const Comment = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    handleClose();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  /* 編輯留言 */
  const [articleid] = useState(props.articleid);
  const [Comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFailure] = useState(false);
  async function Edit() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    const id = Number(articleid);
    const cid = props.id;
    apiArticleCommentEdit(jwt, id, cid)
      .then(async res => {
        const { comments } = res.data.article;
        props.setComments(comments);
        setComment("");
        setFailure(false);
        setSuccess(true);
        /* await apiArticleTakeAllArticle("?aid=" + props.articleid)
          .then(async res => {
            const { comments } = res.data.article;
            props.setComments(comments);
            setComment("");
          })
          .catch(() => {
            return {
              notFound: true,
            };
          }); */
      })
      .catch(() => {
        return {
          notFound: true,
        };
        setSuccess(false);
        setFailure(true);
      });
  }
  return (
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
          <div className="grid grid-cols-2">
            <button
              type="submit"
              className="inline-flex h-fit cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
            >
              <ThumbUpOutlinedIcon />
            </button>
            <p className="inline-flex justify-center p-2">{props.like}</p>
          </div>
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
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={option === "Edit" ? handleEditClick : handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <p className="-mt-4 text-gray-500">{props.contents}</p>
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
  );
};

export default Comment;
