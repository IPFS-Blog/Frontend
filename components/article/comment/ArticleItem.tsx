import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function ArticleItem(props: any) {
  return (
    <li className="group/item my-4 rounded-lg border-4 border-blue-200 first:mt-0">
      <a className="text no-underline" href={`/${props.username}/${props.id}`}>
        <div className="grid h-auto w-full grid-cols-12 gap-x-16 rounded-lg p-2 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
          <div className="col-span-8">
            <p className="mb-2 text-2xl font-bold tracking-tight text-slate-900 line-clamp-1 dark:text-white">
              {props.title}
            </p>
            <div className="mb-2 flex flex-row items-center">
              <Avatar src={props.picture} alt="not find Avatar" />
              <div className="ml-2 flex items-center">
                <p className="text-base"> {props.username}</p>
              </div>
            </div>
            <p className="mb-2 text-base text-slate-500 line-clamp-2 dark:text-slate-400">{props.subtitle}</p>
          </div>
          {/* FIXME:灰底要改為圖片 */}
          <div className="col-span-4 rounded-lg bg-gray-400">
            <img className="h-full w-full rounded-lg" src="" alt="Null"></img>
          </div>
          {/* FIXME:Icon後的數字 */}
          <div className="col-span-12  flex items-center justify-between">
            <div className="flex items-center">
              <p className="ml-2">{props.updateAt.substring(0, 10)}</p>
              {/* TODO:喜歡 */}
              <div className="ml-6">
                <FavoriteBorderOutlinedIcon className="text-black" />
              </div>
              <span className="ml-2">100</span>
              {/* TODO:打賞 */}
              <div className="ml-6">
                <StarsOutlinedIcon className="text-black" />
              </div>
              <span className="ml-2">10</span>
            </div>
            <div className="flex items-center justify-end">
              {/* TODO:收藏 */}
              <IconButton className="mr-4">
                <BookmarkAddOutlinedIcon className="text-black" />
              </IconButton>
              <IconButton className="mr-4">
                <ArrowForwardOutlinedIcon className="text-black" />
              </IconButton>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
