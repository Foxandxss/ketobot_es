import { Ayuda, AyudaDocument, IAyuda } from '../schemas/ayuda.schema';

export class AyudaRepository {
  public async getAll(): Promise<AyudaDocument[]> {
    return Ayuda.find({}).exec();
  }

  public async getByTrigger(trigger: string) {
    return Ayuda.findOne({ trigger }).exec();
  }

  public async create(ayuda: IAyuda): Promise<AyudaDocument> {
    return Ayuda.create(ayuda);
  }

  public async update(ayuda: IAyuda) {
    const update = await this.getByTrigger(ayuda.trigger);
    return Ayuda.updateOne({ _id: update?._id }, ayuda).exec();
  }

  public async delete(ayuda: IAyuda) {
    const update = await this.getByTrigger(ayuda.trigger);
    return Ayuda.deleteOne({ _id: update?._id }).exec();
  }
}
