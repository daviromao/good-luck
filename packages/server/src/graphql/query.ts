import { GraphQLObjectType } from 'graphql';
import * as giveawayQueries from '../giveaway/queries';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query type',
  fields: () => ({
    ...giveawayQueries,
  }),
});
