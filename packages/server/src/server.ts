import Koa from 'koa';
import Router from 'koa-router';
import { graphqlHTTP } from 'koa-graphql';
import schema from './graphql/schema';
import { userMiddleware } from './auth/authMiddleware';

const app = new Koa();
const router = new Router();

router.all(
  '/graphql',
  userMiddleware,
  graphqlHTTP({
    schema,
    graphiql: {
      headerEditorEnabled: true,
    },
  })
);

app.use(router.routes()).use(router.allowedMethods());

export default app;
