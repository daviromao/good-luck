import { Context } from 'koa';
import { getUserFromToken } from './authService';

export const userMiddleware = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  const token = ctx.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    await next();
    return;
  }
  ctx.state.user = await getUserFromToken(token);
  await next();
};
