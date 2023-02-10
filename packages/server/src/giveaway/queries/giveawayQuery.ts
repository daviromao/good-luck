import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { findGiveawayById } from '../giveawayService';
import { GiveawayType } from '../giveawayType';

export const giveawayQuery: GraphQLFieldConfig<any, any, any> = {
  type: GiveawayType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, args) => {
    const { id } = args;

    const giveaway = await findGiveawayById(fromGlobalId(id).id);

    if (!giveaway) {
      throw new Error('Giveaway not found');
    }

    return giveaway;
  },
};
