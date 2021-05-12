export type Command = 'list' | 'add';
// export type service="credential" && "username" && "password";

export type Credential = {
  service: string;
  username: string;
  password: string;
};
