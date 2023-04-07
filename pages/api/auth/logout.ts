import { serialize } from "cookie";

export default async function logout(req: any, res: any) {
  const { cookies } = req;

  const jwt = cookies.UserJWT ?? undefined;

  if (!jwt) {
    res.status(404);
  } else {
    const serialized = serialize("UserJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "成功登出" });
  }
}
