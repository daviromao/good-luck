import app from './server';
import env from './config/env';
import { connectDB } from './config/db';

const start = async () => {
  await connectDB();
  app.listen(env.PORT);
  console.log(`Server running on port ${env.PORT}`);
};

start();
