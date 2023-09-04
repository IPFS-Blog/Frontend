import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

import { _apiCheckJwt, apiArticleTakeAllArticle, apiCommentLike, apiCommentLikesRecord } from "@/components/api";

const options = ["Edit", "Delete"];

const Comment = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              onClick={async () => {
                let jwt = "";
                const data = { aid: props.articleId };
                await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
                if (jwt.trim() !== "") {
                  let CommentLike = false;

                  await apiCommentLikesRecord(jwt, data).then((res: any) => {
                    const CommentLikeRecord = res.data.comments;
                    if (CommentLikeRecord !== null) {
                      // 取得留言是否按過讚
                      CommentLike = CommentLikeRecord.some((comment: any) => {
                        const isMatching = comment.number === props.id;
                        return isMatching;
                      });
                    }
                  });

                  // FIXME: Lin 留言按讚/取消讚成功
                  await apiCommentLike(jwt, props.articleId, props.id, !CommentLike)
                    .then(() => window.alert("按讚成功"))
                    .catch(() => window.alert("按讚失敗"));

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
                } else {
                  window.alert("請先登入謝謝");
                }
              }}
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
                <MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <p className="-mt-4 text-gray-500">{props.contents}</p>
      </div>
    </div>
  );
};

export default Comment;
