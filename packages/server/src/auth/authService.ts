import { verifyPhoneValidation } from '../phoneValidation/phoneValidationService';
import { findUserById, findUserByPhone } from '../user/userService';
import { signJWT, verifyJWT } from '../utils/jwt';

export const loginWithPhoneAndCode = async (phone: string, code: string) => {
  if (!phone || !code) {
    throw new Error('Phone and code are required');
  }

  if (!(await verifyPhoneValidation(phone, code))) {
    throw new Error('Invalid code');
  }

  const user = await findUserByPhone(phone);

  if (!user) {
    throw new Error('User not found');
  }
  const token = signJWT({ id: user._id.toString() });

  return { user, token };
};

export const getUserFromToken = async (token: string) => {
  const decoded = verifyJWT(token) as Record<any, any>;

  const user = await findUserById(decoded.id);

  return user;
};
