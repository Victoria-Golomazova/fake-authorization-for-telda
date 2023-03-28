export type PageTypes = 'auth' | 'register';

export interface User {
  login: string,
  password: string
};

export type AllUsers = User[];