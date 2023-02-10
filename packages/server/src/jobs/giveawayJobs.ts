import { Queue, Worker } from 'bullmq';
import { findGiveawayById } from '../giveaway/giveawayService';
import { connection } from './bull';
import { GiveawayModel } from '../giveaway/giveawayModel';

const queueName = 'giveaway';

export const giveawayQueue = new Queue(queueName, { connection });

export const worker = new Worker(
  queueName,

  async (job: any) => {
    const giveaway = await findGiveawayById(job.data.giveawayId);

    if (!giveaway) throw new Error('Giveaway not found');

    const winners = await GiveawayModel.aggregate([
      {
        $match: {
          _id: giveaway._id,
        },
      },
      { $unwind: '$participants' },
      { $sample: { size: giveaway.winnersCount } },
      { $project: { _id: 0, participants: 1 } },
    ]);

    await GiveawayModel.updateOne(
      { _id: giveaway._id },
      { $set: { winners: winners.map((item) => item.participants) } }
    ).exec();
  },

  { connection }
);
