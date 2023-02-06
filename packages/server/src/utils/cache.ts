import { createClient } from 'redis';
import env from '../config/env';

const client = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

client.on('error', (err: Error) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
})();

export const setCache = async <T>(
  key: string,
  value: T,
  ttl: number
): Promise<boolean> => {
  const result = await client.set(key, JSON.stringify(value), { EX: ttl });
  return result !== null;
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const result = await client.get(key);
  return result ? JSON.parse(result) : null;
};
