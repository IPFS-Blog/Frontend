import { serialize } from "cookie";

export default async function login(req: any, res: any) {
  // TODO: 拿到jwt後 近來這邊設定cookie
  const { jwt } = req.body;

  const serialized = serialize("UserJWT", jwt, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json("成功設定cookie");
}
