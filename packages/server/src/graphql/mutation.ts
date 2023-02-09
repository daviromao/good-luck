import { GraphQLObjectType } from 'graphql';
import * as phoneValidationMutations from '../phoneValidation/mutations';
import * as userMutations from '../user/mutations';
import * as authMutations from '../auth/mutations';
import * as giveawayMutations from '../giveaway/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: () => ({
    ...phoneValidationMutations,
    ...userMutations,
    ...authMutations,
    ...giveawayMutations,
  }),
});
