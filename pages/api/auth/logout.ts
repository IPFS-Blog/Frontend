import { serialize } from "cookie";

export default async function logout(req: any, res: any): Promise<void> {
  const { cookies } = req;

  const jwt = cookies.UserJWT ?? undefined;
  if (jwt != undefined) {
    const serialized = serialize("UserJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json("成功刪除cookie");
  }
}
