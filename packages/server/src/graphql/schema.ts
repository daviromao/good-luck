import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { MutationType } from './mutation';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'The root query type',
    fields: () => ({
      queris: {
        type: GraphQLString,
        resolve: () => 'Hello World',
      },
    }),
  }),
  mutation: MutationType,
});

export default schema;
