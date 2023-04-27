import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const Comment = () => {
  return (
    <div>
      <div className="flex items-center bg-gray-50 px-3 py-1 dark:bg-gray-700">
        <img className="h-auto w-10 rounded-full" src="/avater.jpg" alt=""></img>
        <p className="mx-2">name</p>
        <span className="mx-4 block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
          顯示留言
        </span>
        <button
          type="submit"
          className="inline-flex justify-center rounded-full p-2 text-blue-600 hover:bg-gray-300 dark:text-blue-500 dark:hover:bg-gray-100"
        >
          <ThumbUpOutlinedIcon />
          <span className="sr-only">按讚</span>
        </button>
      </div>
    </div>
  );
};

export default Comment;
