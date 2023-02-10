import { GraphQLObjectType, GraphQLString } from 'graphql';
import { User } from '../user/userModel';

export interface JwtAuth {
  token: string;
  user: User;
}

export const JwtAuthType = new GraphQLObjectType<JwtAuth>({
  name: 'JwtAuth',
  fields: () => ({
    token: {
      type: GraphQLString,
      resolve: (auth) => auth.token,
    },
    user: {
      type: GraphQLString,
      resolve: (auth) => auth.user,
    },
  }),
});
