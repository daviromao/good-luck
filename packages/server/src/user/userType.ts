import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { User } from './userModel';

export const UserType = new GraphQLObjectType<User>({
  name: 'User',
  fields: () => ({
    id: globalIdField('User', (user) => user._id.toString()),
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    phone: {
      type: GraphQLString,
      resolve: (user) => user.phone,
    },
  }),
});

export const GraphQLUserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
