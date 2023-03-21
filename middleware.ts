import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export default async function middleware(req: any) {
  const token = req.cookies.get("UserJWT")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch(err => {
      console.log(err);
    }));

  const url = req.url;
  // console.log(verifiedToken.address);
  if (url.includes("/dashboard") && verifiedToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect("http://localhost:3000/");
}

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
    return verified.payload;
  } catch (error) {
    throw new Error("你的Token是錯誤的");
  }
}
export function getJwtSecretKey() {
  const secret = process.env.NEXT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("JWT secret沒有設定");
  }

  return secret;
}
export const config = {
  matcher: "/dashboard",
};
