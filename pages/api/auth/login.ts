import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
const secret = process.env.NEXT_SECRET;
export default async function login(req: any, res: any) {
  // TODO: 拿到token後 近來這邊設定cookie
  // const { token } = req.body;
  if (secret) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        address: "0xEFa4Abac7FedB8F0514beE7212dc19D523DD3089",
      },
      secret,
    );
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
}
