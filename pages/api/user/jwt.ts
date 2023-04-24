export default async function user(req: any, res: any) {
  const { cookies } = req;

  const jwt = cookies.UserJWT ?? undefined;

  if (jwt === undefined) {
    return res.json({ jwt: null });
  }

  return res.json({ jwt });
}
