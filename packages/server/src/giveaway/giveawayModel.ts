import mongoose, { Types } from 'mongoose';

export interface Giveaway {
  readonly _id: mongoose.Types.ObjectId;
  id: string;
  owner: Types.ObjectId;
  title: string;
  description: string;
  winnersCount: number;
  winners: Types.ObjectId[];
  participants: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export const giveawaySchema = new mongoose.Schema<Giveaway>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 32,
    },
    description: {
      type: String,
      required: true,
      maxLength: 256,
    },
    winnersCount: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    winners: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const GiveawayModel = mongoose.model<Giveaway>(
  'Giveaway',
  giveawaySchema
);
