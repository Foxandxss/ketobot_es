import { Generic, IGeneric } from '../schemas/generic.schema';
import { BaseRepository } from './base.repository';

export class GenericRepository extends BaseRepository<IGeneric> {
  constructor() {
    super(Generic);
  }

  public async getByTrigger(trigger: string) {
    return Generic.findOne({ trigger }).exec();
  }

  public async findAndUpdate(generic: IGeneric): Promise<unknown> {
    const obj = await this.getByTrigger(generic.trigger);
    if (obj) {
      return super.update(obj._id, generic);
    }
    return super.create(generic);
  }

  public async findAndDelete(generic: IGeneric) {
    const obj = await this.getByTrigger(generic.trigger);
    if (obj) {
      return super.delete(obj._id);
    }
    return null;
  }
}
