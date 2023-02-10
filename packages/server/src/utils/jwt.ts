import env from '../config/env';
import jwt from 'jsonwebtoken';

export const signJWT = (payload: Record<any, any>) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};
