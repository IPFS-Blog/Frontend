export default async function user(req: any, res: any) {
  const { cookies } = req;

  const token = cookies.UserJWT ?? undefined;

  if (token === undefined) {
    res.status(404);
  }

  res.json({ token });
}
