import { Document, model, Schema } from 'mongoose';

interface IUser {
  username: string;
}

const usersSchema = new Schema<IUser>(
  {
    username: { type: String, required: true }
  },
  { collection: 'users' }
);

export const User = model<IUser>('User', usersSchema);
export type UserDocument = Document & IUser;
