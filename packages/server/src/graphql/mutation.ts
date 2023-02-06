import { GraphQLObjectType } from 'graphql';
import * as phoneValidationMutations from '../phoneValidation/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: () => ({
    ...phoneValidationMutations,
  }),
});
