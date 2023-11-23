import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

import ArticleItem from "@/components/article/ArticleItem";
import Follow from "@/components/users/Follow";

const SearchResults = (props: any) => {
  const User = useSelector((state: any) => state.User);
  return (
    <div className="my-2">
      <h1>使用者：</h1>
      <ul>
        {props.userResults.map((user: any) => (
          <li key={user.id}>
            <a
              href={"/" + user.username}
              className="my-2 flex flex-row items-center justify-between rounded border border-blue-200 bg-gray-50 p-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500"
            >
              {/* TODO: 文章擁有者資料 頭貼、名稱 */}
              <div className="flex flex-row items-center">
                <Avatar src={user.picture} alt="not find Avatar" />
                <div className="px-2">
                  <div>{user.username}</div>
                </div>
                <div className="ml-10">{user.id != User.profile.id ? <Follow subscriberId={user.id} /> : null}</div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <h1 className="my-2">文章結果：</h1>
      <ul>
        {props.articleResults.map((article: any) => (
          <li key={article.id}>
            <ArticleItem
              username={article.user.username}
              picture={article.user.picture}
              id={article.id}
              title={article.title}
              subtitle={article.subtitle}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
