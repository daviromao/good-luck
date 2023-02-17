import { Context } from 'koa';
import { getUserFromToken } from './authService';

export const userMiddleware = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  try {
    const token = ctx.headers.authorization?.replace('Bearer ', '');

    if (!token) throw new Error('No token provided');

    ctx.state.user = await getUserFromToken(token);
  } catch (e) {
    ctx.state.user = null;
  } finally {
    await next();
  }
};
