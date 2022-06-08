import { Ayuda, AyudaDocument } from '../schemas/ayuda.schema';

export class AyudaRepository {
  public async getAll(): Promise<AyudaDocument[]> {
    return Ayuda.find({}).exec();
  }

  public async getByTrigger(trigger: string) {
    console.log('Trigger', trigger);
    return Ayuda.findOne({ trigger }).exec();
  }

  // public async save(ayuda: AyudaDocument): Promise<AyudaDocument> {
  //   return this.ayudaModel.create(ayuda);
  // }

  // public async update(ayuda: AyudaDocument): Promise<AyudaDocument> {
  //   return this.ayudaModel.updateOne({ _id: ayuda._id }, ayuda).exec();
  // }

  // public async delete(ayuda: AyudaDocument): Promise<AyudaDocument> {
  //   return this.ayudaModel.deleteOne({ _id: ayuda._id }).exec();
  // }
}
