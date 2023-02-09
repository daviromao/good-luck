import { Types } from 'mongoose';
import { UserModel, User } from './userModel';

export const findUserById = async (
  id: Types.ObjectId | string
): Promise<User | null> => {
  return await UserModel.findById(id);
};

export const findUserByPhone = async (phone: string): Promise<User | null> => {
  return await UserModel.findOne({ phone });
};

export const createUser = async (
  user: Omit<User, '_id' | 'id'>
): Promise<User> => {
  return await UserModel.create(user);
};
