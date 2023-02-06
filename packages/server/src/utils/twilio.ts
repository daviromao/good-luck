import { Twilio } from 'twilio';
import env from '../config/env';

const accountSid = env.TWILIO_SID;
const authToken = env.TWILIO_TOKEN;
const twilioNumber = env.TWILIO_NUMBER;

const client = new Twilio(accountSid, authToken);

export const sendSms = (to: string, body: string) => {
  return client.messages.create({
    body,
    to,
    from: twilioNumber,
  });
};
