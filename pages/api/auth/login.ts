import { serialize } from "cookie";
export default async function login(req: any, res: any) {
  // TODO: 拿到token後 近來這邊設定cookie
  // const { token } = req.body;
  const token = "ABC";
  const serialized = serialize("UserJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  res.status(200).json({ message: "成功設定cookie" });
}
