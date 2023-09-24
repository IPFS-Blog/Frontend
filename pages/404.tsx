import Link from "next/link";

export default function Error() {
  return (
    <div className="flex items-center justify-center">
      <img
        className="mx-2 my-3 h-1/3 w-1/3 bg-cover bg-center bg-no-repeat drop-shadow-xl"
        src="/img/error/404.png"
        alt="not found Img"
      />
      <div className="mx-2 my-3 font-sans text-3xl">
        <p>抱歉，找不到該頁面</p>
        <br />
        <p>請嘗試重新輸入網址，或直接返回首頁。</p>
        <span>
          點擊跳轉置
          <Link className="px-2 underline " href="/">
            首頁
          </Link>
        </span>
      </div>
    </div>
  );
}
