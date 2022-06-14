import { Ayuda, IAyuda } from '../schemas/ayuda.schema';
import { GenericRepository } from './generic.repository';

export class AyudaRepository extends GenericRepository<IAyuda> {
  constructor() {
    super(Ayuda);
  }

  public async getByTrigger(trigger: string) {
    return Ayuda.findOne({ trigger }).exec();
  }

  public async findAndUpdate(ayuda: IAyuda): Promise<unknown> {
    const obj = await this.getByTrigger(ayuda.trigger);
    if (obj) {
      return super.update(obj._id, ayuda);
    }
    return null;
  }

  public async findAndDelete(ayuda: IAyuda) {
    const obj = await this.getByTrigger(ayuda.trigger);
    if (obj) {
      return super.delete(obj._id);
    }
    return null;
  }
}
