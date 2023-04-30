import Link from "next/link";

export default function Error() {
  return (
    <div className="my-10 mx-5 grid grid-cols-6 place-content-center gap-4">
      <div>
        <p className="text-9xl text-gray-900">404</p>
      </div>
      <div className="mx-2 my-3">
        <p>抱歉，找不到該頁面</p>

        <p>請嘗試重新輸入網址，或直接返回首頁。</p>
        <span>
          點擊跳轉置
          <Link className="px-2 underline" href="/">
            首頁
          </Link>
        </span>
      </div>
    </div>
  );
}
