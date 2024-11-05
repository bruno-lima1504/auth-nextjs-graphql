"use client";

import { User } from "@/lib/user.type";
import styles from "./styles.module.scss";

interface UsersProps {
  users: User[];
}

export default function Users({ users }: UsersProps) {
  return (
    <main className={styles.container}>
      <div className={styles.lisUser}>
        {users.map((user: any) => (
          <div className={styles.userItem} key={user.id}>
            <span>Nome: {user.name}</span>
            <span>Email: {user.email}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
