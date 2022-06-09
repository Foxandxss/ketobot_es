import { User, UserDocument } from '../schemas/user.schema';

export class UsersRepository {
  public async getByUsername(username: string): Promise<UserDocument | null> {
    return User.findOne({ username }).exec();
  }
}
