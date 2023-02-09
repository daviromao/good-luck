import { Types } from 'mongoose';
import { Giveaway, GiveawayModel } from './giveawayModel';

export const findGiveawayById = async (
  id: Types.ObjectId | string
): Promise<Giveaway | null> => {
  return await GiveawayModel.findById(id);
};

export const createGiveaway = async (
  giveaway: Partial<Giveaway>
): Promise<Giveaway> => {
  return await GiveawayModel.create(giveaway);
};

export const insertParticipantInGiveaway = async (
  giveawayId: Types.ObjectId | string,
  participantId: Types.ObjectId
): Promise<Giveaway | null> => {
  return await GiveawayModel.findByIdAndUpdate(
    giveawayId,
    { $push: { participants: participantId } },
    { new: true }
  );
};
