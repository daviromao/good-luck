import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { User } from './userModel';

export const UserType = new GraphQLObjectType<User>({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
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
