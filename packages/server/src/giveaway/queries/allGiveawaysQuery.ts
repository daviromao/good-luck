import {
  connectionFromMongoCursor,
  mongooseLoader,
} from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { connectionArgs, ConnectionArguments } from 'graphql-relay';
import { GiveawayModel } from '../giveawayModel';
import { GraphQLGiveawayConnection } from '../giveawayType';

export const allGiveawayQuery: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(GraphQLGiveawayConnection.connectionType),
  description: 'All giveaways',
  args: connectionArgs,
  resolve: async (_root, args: ConnectionArguments, context) => {
    const loader = new DataLoader(async (ids) => {
      return mongooseLoader(GiveawayModel, ids as string[]);
    });

    return connectionFromMongoCursor({
      cursor: GiveawayModel.find(),
      context,
      args,
      loader: (_context, id) => loader.load(id),
    });
  },
};
