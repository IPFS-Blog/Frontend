import Link from "next/link";

export default function Index() {
  return (
    <div>
      <div className="m-2 text-5xl text-blue-900 dark:text-blue-600">文件</div>
      <ul>
        <li>
          <Link href="/docs/NetworkInstructions" className="px-2 underline ">
            如何加入我們的區塊鏈網路
          </Link>
        </li>
        <li>
          <Link href="/docs/JoinCoin" className="px-2 underline ">
            如何加入我們的 AC 代幣
          </Link>
        </li>
      </ul>
    </div>
  );
}
