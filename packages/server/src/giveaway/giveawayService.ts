import { Types } from 'mongoose';
import { giveawayQueue } from '../jobs/giveawayJobs';
import { Giveaway, GiveawayModel } from './giveawayModel';

export const findGiveawayById = async (id: Types.ObjectId | string) => {
  return await GiveawayModel.findById(id);
};

export const createGiveaway = async (giveaway: Partial<Giveaway>) => {
  const newGiveaway = await GiveawayModel.create(giveaway);

  if (!newGiveaway) throw new Error('Error creating giveaway');

  giveawayQueue.add(
    'giveaway',
    { giveawayId: newGiveaway._id },
    { delay: newGiveaway.endsAt.getTime() - Date.now() }
  );

  return newGiveaway;
};

export const insertParticipantInGiveaway = async (
  giveawayId: Types.ObjectId | string,
  participantId: Types.ObjectId
) => {
  return await GiveawayModel.findByIdAndUpdate(
    giveawayId,
    { $push: { participants: participantId } },
    { new: true }
  );
};
