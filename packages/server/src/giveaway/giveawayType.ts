import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import connectionFromMongoCursor from '@entria/graphql-mongoose-loader/lib/ConnectionFromMongoCursor';
import DataLoader from 'dataloader';
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  connectionArgs,
  ConnectionArguments,
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';
import { UserModel } from '../user/userModel';
import { findUserById } from '../user/userService';
import { GraphQLUserConnection, UserType } from '../user/userType';
import { Giveaway } from './giveawayModel';

export const GiveawayType = new GraphQLObjectType<Giveaway>({
  name: 'Giveaway',
  fields: () => ({
    id: globalIdField('Giveaway', (giveaway) => giveaway._id.toString()),
    owner: {
      type: new GraphQLNonNull(UserType),
      resolve: async (giveaway) => {
        const owner = await findUserById(giveaway.owner);
        return owner;
      },
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (giveaway) => giveaway.title,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (giveaway) => giveaway.description,
    },
    winnersCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (giveaway) => giveaway.winnersCount,
    },
    winners: {
      type: new GraphQLNonNull(GraphQLUserConnection.connectionType),
      args: connectionArgs,
      resolve: async (giveaway, args: ConnectionArguments, context) => {
        const loader = new DataLoader(async (ids) => {
          return mongooseLoader(UserModel, ids as string[]);
        });

        return connectionFromMongoCursor({
          cursor: UserModel.find({ _id: { $in: giveaway.winners } }),
          context,
          args,
          loader: (_context, id) => loader.load(id),
        });
      },
    },
    participants: {
      type: new GraphQLNonNull(GraphQLUserConnection.connectionType),
      args: connectionArgs,
      resolve: async (giveaway, args: ConnectionArguments, context) => {
        const loader = new DataLoader(async (ids) => {
          return mongooseLoader(UserModel, ids as string[]);
        });

        return connectionFromMongoCursor({
          cursor: UserModel.find({ _id: { $in: giveaway.participants } }),
          context,
          args,
          loader: (_context, id) => loader.load(id),
        });
      },
    },
    endsAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (giveaway) => giveaway.endsAt.toISOString(),
    },
  }),
});

export const GraphQLGiveawayConnection = connectionDefinitions({
  name: 'Giveaway',
  nodeType: GiveawayType,
});
