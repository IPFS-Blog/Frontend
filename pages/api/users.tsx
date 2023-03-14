// axios.post("/api/register", {
//     username: "john",
//     password: "password",
//   })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// api/users.js
import { NextApiRequest, NextApiResponse } from "next";

type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(users);
}
