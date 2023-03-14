import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default Users;
