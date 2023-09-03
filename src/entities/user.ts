export type LoginData = {
  userName: string;
  passwd: string;
};

export type UserWithID = {
  id: string;
};

export type UserNoId = LoginData & {
  email: string;
  firstName: string;
  lastName: string;
  friends: User[];
  enemies: User[];
};

export type User = UserWithID & UserNoId;
