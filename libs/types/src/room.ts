import { User } from './user';

export type Room = {
  users: User[];
};

export const defaultRoom = {
  users: [],
};
