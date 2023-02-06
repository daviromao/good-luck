import mongoose from 'mongoose';

export interface User {
  readonly _id: mongoose.Types.ObjectId;
  id: string;
  name: string;
  phone: string;
}

export const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    maxLength: 32,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<User>('User', userSchema);
