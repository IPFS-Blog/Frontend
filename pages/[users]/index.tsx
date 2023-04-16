import { useClipboard } from "use-clipboard-copy";

import Card from "@/components/users/Card";

export default function Users() {
  const { copy } = useClipboard();
  const text = "複製的文字";
  const handleCopy = () => {
    copy(text);
  };

  return (
    <>
      <div className="flex">
        <div className="w-96 flex-auto lg:w-3/4">
          <Card />
        </div>
        <div>
          <dl className="mx-auto grid grid-cols-3 p-3 text-gray-900 sm:grid-cols-3 sm:p-2 xl:grid-cols-3">
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
            <div className="flex flex-col p-2 text-center">
              <dt>
                <a href="javascript:void(0)" onClick={handleCopy}>
                  複製
                </a>
              </dt>
              <dd className="text-gray-600">編輯個人資料</dd>
              <dd className="text-gray-600">個人錢包</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
