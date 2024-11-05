export interface ListUser {
  users: User[];
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
