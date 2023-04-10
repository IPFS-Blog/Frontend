import { NextResponse } from "next/server";

export default async function middleware(req: any) {
  // 從cookie中撈JWT
  const jwt = req.cookies.get("UserJWT")?.value;
  // 設定重導向網址
  const protocol = req.secure ? "https" : "http";
  const host = req.headers.get("host");
  const redirectUrl = `${protocol}://${host}/`;
  if (jwt != null) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(redirectUrl);
  }
}
export const config = {
  matcher: "/dashboard",
};
