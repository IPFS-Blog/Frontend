export default function NetworkInstructions() {
  // TODO: UI funtion

  return (
    <div>
      {/* TODO: 加入錢幣到metamask */}
      <div className="m-2 text-5xl text-blue-900 dark:text-blue-600">
        如何加入我們的 <span className="font-semibold">Network</span> ?
      </div>
      <div className="my-5 mx-2 text-base text-blue-900 dark:text-blue-600 font-semibold">
        <div className="text-xl my-2">第一步</div>
        <figure>
          <img src="/doc/NetworkInstructions1.gif" width={800} alt="GIF" />
          <figcaption className="my-2">
            <h1 className="text-lg">先打開你的錢包</h1>
            <ol>
              <li>1. 打開設定</li>
              <li>2. 點擊網路</li>
              <li>3. 點擊右上角 "add a network" </li>
            </ol>
          </figcaption>
        </figure>
        <hr />
        <div className="text-xl my-2">第二步</div>
        <figure>
          <img src="/doc/NetworkInstructions2.png" width={800} alt="PNG" />
          <figcaption className="my-2">
            <h1 className="text-lg">填入我們的網路資料!</h1>
            <ol>
              <li>1. 填完後點擊儲存</li>
              <li>2. 就可以在左欄看見"IPFS幣記"</li>
              <li>3. 這樣就成功有我們的區塊鏈網路囉</li>
            </ol>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
