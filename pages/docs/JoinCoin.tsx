import Link from "next/link";
export default function JoinCoin() {
  return (
    <div>
      <div className="m-2 text-5xl text-blue-900 dark:text-blue-600">
        如何加入我們的 <span className="font-semibold"> AC 貨幣</span> ?
      </div>
      <div className="my-5 mx-2 text-base font-semibold text-blue-900 dark:text-blue-600">
        <div className="my-2 text-xl">第一步</div>
        <figure>
          <h1 className="text-lg">先確認已加入 IPFS 幣記 Network</h1>
          <span>還未加入的話請點及該文件加入</span>
          <Link href="/docs/NetworkInstructions" className="px-2 underline ">
            如何加入我們的區塊鏈網路
          </Link>
          <figcaption className="my-2">
            <h1 className="text-lg">進到我們的水龍頭</h1>
            <ol>
              <li>點擊 &Prime; 領取十個 ETHER &Prime;</li>
              <li>出現成功訊息後到錢包確認</li>
            </ol>
          </figcaption>
        </figure>
        <hr />
        <div className="my-2 text-xl">第二步</div>
        <figure>
          <figcaption className="my-2">
            <h1 className="text-lg">在右上角上 點擊頭像</h1>
            <ol>
              <li>點擊 &Prime; 加入 AC 貨幣 &Prime;</li>
              <li>出現成功訊息後到錢包確認</li>
            </ol>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
