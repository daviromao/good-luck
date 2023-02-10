import { GraphQLBoolean, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { insertParticipantInGiveaway } from '../giveawayService';

export const JoinInGiveaway = mutationWithClientMutationId({
  name: 'JoinInGiveaway',
  description: 'Join in a giveaway',
  inputFields: {
    giveawayId: { type: GraphQLString },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
    },
  },
  async mutateAndGetPayload({ giveawayId }, context) {
    if (!context.state.user) {
      throw new Error('You must be logged in to join in a giveaway');
    }

    const joinInAGiveaway = await insertParticipantInGiveaway(
      fromGlobalId(giveawayId).id,
      context.state.user._id.toString()
    );

    return {
      success: !!joinInAGiveaway,
    };
  },
});
