import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { useClipboard } from "use-clipboard-copy";
import Editprofile from "@/components/users/EditProfile";
import Card from "@/components/users/Card";

export default function Users() {
  const { copy } = useClipboard();
  const text = "0x4202043D9ff98a4e8C64b075dBF4Cb3eE5EfF528";
  const handleCopy = () => {
    copy(text);
  };

  return (
    <div className="my-2 h-auto w-full">
      <div className="flex h-auto w-full justify-around">
        {/* FIXME:要 Card 縮小後要變另外一種*/}
        <div className="px-5">
          <Card />
        </div>
        <div className="w-auto flex-auto">
          <dl className="mx-auto grid grid-cols-3 p-3 text-gray-900 sm:grid-cols-3 sm:px-1 xl:grid-cols-3">
            <div className="flex flex-col p-2 text-center">
              <dt className="text-base">所有文章</dt>
              <dd className="text-gray-600 ">50</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="text-base">粉絲</dt>
              <dd className="text-gray-600 ">40</dd>
            </div>
            <div className="flex flex-col p-2 text-center">
              <dt className="text-base">追蹤中</dt>
              <dd className="text-gray-600 ">20</dd>
            </div>
          </dl>
          <dl>
            {/* FIXME:如果是公開要換追蹤按鈕以及打賞 */}
            <div className="flex flex-col p-2 text-center">
              <button onClick={handleCopy} className="inline-flex w-full justify-center py-2 px-5">
                <p className="px-2 underline decoration-blue-500 hover:underline hover:decoration-blue-200">
                  0x4202043D9ff98a4e8C64b075dBF4Cb3eE5EfF528
                </p>
                <ContentCopyRoundedIcon />
              </button>
              {/* TODO:私人:編輯個人資料、個人錢包 */}
              <p className="text-gray-600"><Editprofile /></p>
              <p className="text-gray-600">個人錢包</p>
              {/* TODO:公開:追蹤按鈕以及打賞 */}
              <div className="flex flex-row justify-center p-2 text-center">
                <button className="mx-2 rounded border border-red-500 py-2 px-20 font-semibold text-red-500 hover:bg-red-500 hover:text-white">
                  追蹤
                </button>

                <button className="mx-2 rounded border border-green-500 py-2 px-20 font-semibold text-green-500 hover:bg-green-500 hover:text-white">
                  打賞
                </button>
              </div>
            </div>
          </dl>
        </div>
      </div>
      {/* sub-nav */}
      {/* FIXME:如果是公開導覽列(目前公開導覽列沒有項目)就換過來 */}
      <nav className="my-5 mx-2 flex justify-between bg-blue-200 py-3">
        {/* TODO:私人:所有、收藏、瀏覽紀錄、按讚紀錄 */}
        <ul className="flex h-full items-center">
          <li>
            <a href="#" className="rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              所有
            </a>
          </li>
          <li>
            <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              收藏
            </a>
          </li>
          <li>
            <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              瀏覽紀錄
            </a>
          </li>
          <li>
            <a href="#" className="ml-4 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              按讚紀錄
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
