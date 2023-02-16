import { GraphQLInt, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { createGiveaway } from '../giveawayService';
import { GiveawayType } from '../giveawayType';
import * as Yup from 'yup';

type CreateGiveawayArgs = {
  title: string;
  description: string;
  winnersCount: number;
  endsAt: string | Date;
};

const CreateGiveawaySchema = Yup.object().shape({
  title: Yup.string().required().min(3).max(100),
  description: Yup.string().required().min(3).max(1000),
  winnersCount: Yup.number().required().min(1).max(100),
  endsAt: Yup.date()
    .required()
    .min(new Date(), 'Giveaway must end in the future'),
});

export const CreateGiveawayMutation = mutationWithClientMutationId({
  name: 'CreateGiveaway',
  description: 'Create a new giveaway',
  inputFields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    winnersCount: { type: GraphQLInt },
    endsAt: { type: GraphQLString },
  },
  outputFields: {
    giveaway: {
      type: GiveawayType,
      resolve: (giveaway) => giveaway,
    },
  },
  async mutateAndGetPayload(
    { title, description, winnersCount, endsAt }: CreateGiveawayArgs,
    context
  ) {
    if (!context.state.user) {
      throw new Error('You must be logged in to create a giveaway');
    }

    await CreateGiveawaySchema.validate({
      title,
      description,
      winnersCount,
      endsAt,
    });

    const giveaway = await createGiveaway({
      title,
      description,
      winnersCount,
      owner: context.state.user._id,
      endsAt: endsAt as any,
    });

    return giveaway;
  },
});
