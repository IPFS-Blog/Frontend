import { verify } from "jsonwebtoken";
const secret = process.env.NEXT_SECRET;
export default async function user(req: any, res: any) {
  const { cookies } = req;

  const jwt = cookies.get("UserJWT")?.value;

  if (jwt === undefined) {
    res.json({ message: "Invalid JWT" });
  }
  try {
    if (secret) verify(jwt, secret);
    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "Invalid JWT" });
  }
}
