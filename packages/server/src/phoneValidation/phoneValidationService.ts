import { getCache, setCache } from '../utils/cache';
import { sendSms } from '../utils/twilio';
import { PhoneValidation } from './phoneValidationType';

const codeExpiration = 1000 * 60 * 5;
const codeLength = 6;

export const createPhoneValidation = async (
  phone: string
): Promise<boolean> => {
  const code = generateCode();

  const phoneValidation = {
    phone,
    code,
  };

  const wasCached = await setCache<PhoneValidation>(
    `phone-validation:${phone}`,
    phoneValidation,
    codeExpiration
  );

  await sendSms(phone, `Your verification code is ${code}.`);

  return wasCached;
};

export const verifyPhoneValidation = async (
  phone: string,
  code: string
): Promise<boolean> => {
  const phoneValidation = await getCache<PhoneValidation>(
    `phone-validation:${phone}`
  );

  if (!phoneValidation || phoneValidation.code !== code) {
    return false;
  }

  return true;
};

export const generateCode = (): string => {
  const code = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(codeLength, '0');
  return code;
};
