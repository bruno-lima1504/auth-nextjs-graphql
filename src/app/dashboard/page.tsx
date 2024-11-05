import Users from "./components/users";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { ListUser } from "@/lib/user.type";
import styles from "./styles.module.scss";
async function getUsers(): Promise<ListUser | null> {
  const query = `query {
                  ListUser {
                    users {
                      id
                      name
                      email
                    }
                    count
                  }
                }`;

  const token = await getCookieServer();
  try {
    const response = await api.post(
      "/graphql",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const result = await response.data.data.ListUser;

    return result;
  } catch (err) {
    console.log("Falha ao buscar usuários", err);
    return null;
  }
}

export default async function Dashboard() {
  const userList: ListUser | null = await getUsers();
  const users = userList ? userList.users : [];
  const count = userList ? userList.count : 0;

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.userTitle}>Total de usuários: {count}</h1>
      </div>
      <Users users={users} />
    </>
  );
}
