import { Model, Types } from 'mongoose';

export class GenericRepository<E> {
  constructor(private model: Model<E>) {}
  public async getAll(): Promise<E[]> {
    return this.model.find({}).exec();
  }

  public async create(payload: E): Promise<E> {
    return this.model.create(payload);
  }

  public async update(id: Types.ObjectId, payload: E): Promise<unknown> {
    return this.model.updateOne({ _id: id }, payload).exec();
  }

  public async delete(id: Types.ObjectId): Promise<boolean> {
    await this.model.deleteOne({ _id: id }).exec();
    return true;
  }
}
