import * as envalid from "envalid";

import dotenv from "dotenv";
dotenv.config();

const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({ default: "development" }),
  PORT: envalid.port({ default: 3333 }),
  MONGO_URI: envalid.str(),
  REDIS_HOST: envalid.str({ default: "localhost" }),
  REDIS_PORT: envalid.port({ default: 6379 }),
});

export default env;
