import { serialize } from "cookie";

export default async function login(req: any, res: any) {
  // TODO: 拿到jwt後 近來這邊設定cookie
  const { JWT } = req.body;

  const serialized = serialize("UserJWT", JWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  res.status(200).send("成功設定cookie");
}
