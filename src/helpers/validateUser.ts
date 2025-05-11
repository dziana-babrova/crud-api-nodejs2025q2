import { v4 as uuidv4 } from 'uuid';
import { usersType } from '../database/users';

export const validateUser: (user: any) => usersType | null = (user) => {
  if (!user.username || !user.age || !user.hobbies) return null;
  return {
    id: uuidv4(),
    username: user.username,
    age: user.age,
    hobbies: user.hobbies,
  };
};
