import { useState } from "react";

import { CheckChainIdFunction } from "@/helpers/users/CheckChainIdFunction";

export default function NetworkInstructions() {
  const [isInChainId, setIsInChainId] = useState(2);
  const [loading, setLoading] = useState(false);
  const connect = async () => {
    const InChainId = await CheckChainIdFunction();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (InChainId == false) {
      setIsInChainId(1);
    } else if (InChainId == "Fix") {
      window.alert("區塊鏈維修中");
    } else {
      setIsInChainId(0);
    }
  };
  return (
    <div>
      <div className="m-2 text-5xl text-blue-900 dark:text-blue-600">
        如何加入我們的 <span className="font-semibold">Network</span> ?
      </div>
      <div className="my-5 mx-2 text-base font-semibold text-blue-900 dark:text-blue-600">
        <p>點擊以下按鈕監測網路有無加入成功</p>
        <div className="flex">
          <button
            className="my-2 flex w-fit rounded bg-blue-900 px-6 py-2 text-blue-50 shadow-blue-400/30 transition-colors duration-300 hover:bg-blue-500"
            onClick={connect}
          >
            監測網路
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mx-2 h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
          </button>
          {!loading ? (
            isInChainId ? (
              <div className="my-2 w-fit rounded border  bg-red-500 py-2 px-10 font-semibold  text-white tablet:mx-2 tablet:px-5">
                未加入 IPFS 幣記 網路
              </div>
            ) : (
              <div className="my-2 w-fit rounded border  bg-green-500 py-2 px-10 font-semibold  text-white tablet:px-5">
                已加入 IPFS 幣記 網路
              </div>
            )
          ) : null}
        </div>
        <div className="my-2 text-xl">第一步</div>
        <figure>
          <img src="/doc/NetworkInstructions1.gif" width={800} alt="GIF" />
          <figcaption className="my-2">
            <h1 className="text-lg">先打開你的錢包</h1>
            <ol>
              <li>1. 打開設定</li>
              <li>2. 點擊網路</li>
              <li>3. 點擊右上角 &Prime; add a network &Prime; </li>
            </ol>
          </figcaption>
        </figure>
        <hr />
        <div className="my-2 text-xl">第二步</div>
        <figure>
          <img src="/doc/NetworkInstructions2.png" width={800} alt="PNG" />
          <figcaption className="my-2">
            <h1 className="text-lg">填入我們的網路資料!</h1>
            <ol>
              <li>1. 填完後點擊儲存</li>
              <li>2. 就可以在左欄看見 &Prime; IPFS幣記 &Prime;</li>
              <li>3. 這樣就成功有我們的區塊鏈網路囉</li>
            </ol>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
