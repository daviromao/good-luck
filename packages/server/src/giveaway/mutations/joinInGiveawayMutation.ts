import { GraphQLBoolean, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { insertParticipantInGiveaway } from '../giveawayService';
import * as Yup from 'yup';

type JoinInGiveawayArgs = {
  giveawayId: string;
};

const JoinInGiveawaySchema = Yup.object().shape({
  giveawayId: Yup.string().required(),
});

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
  async mutateAndGetPayload({ giveawayId }: JoinInGiveawayArgs, context) {
    if (!context.state.user) {
      throw new Error('You must be logged in to join in a giveaway');
    }

    await JoinInGiveawaySchema.validate({
      giveawayId,
    });

    const joinInAGiveaway = await insertParticipantInGiveaway(
      fromGlobalId(giveawayId).id,
      context.state.user._id.toString()
    );

    return {
      success: !!joinInAGiveaway,
    };
  },
});
