import Link from "next/link";

export default function Error() {
  return (
    <div className="flex w-full justify-center">
      <p className="text-9xl text-gray-900">404</p>
      <p>抱歉，找不到該頁面</p>

      <p>請嘗試重新輸入網址，或直接返回首頁。</p>
      <span>
        跳轉置 <Link href="/">首頁</Link>
      </span>
    </div>
  );
}
