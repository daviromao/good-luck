import { GraphQLInt, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { createGiveaway } from '../giveawayService';
import { GiveawayType } from '../giveawayType';

export const CreateGiveawayMutation = mutationWithClientMutationId({
  name: 'CreateGiveaway',
  description: 'Create a new giveaway',
  inputFields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    winnersCount: { type: GraphQLInt },
  },
  outputFields: {
    giveaway: {
      type: GiveawayType,
      resolve: (giveaway) => giveaway,
    },
  },
  async mutateAndGetPayload({ title, description, winnersCount }, context) {
    if (!context.state.user) {
      throw new Error('You must be logged in to create a giveaway');
    }

    const giveaway = await createGiveaway({
      title,
      description,
      winnersCount,
      owner: context.state.user._id,
    });

    return giveaway;
  },
});
