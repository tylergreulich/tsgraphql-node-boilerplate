import * as jwt from 'jsonwebtoken';
import { User } from '../interfaces/auth.interface';
import { keys } from '../../config/keys';

export const signJwtToken = (user: User) => {
  const { username, email, isAdmin } = user;

  return {
    token: jwt.sign({ username, email, isAdmin }, keys.SECRET, {
      expiresIn: '1hr'
    })
  };
};
