import { Document, Model, model, Schema } from 'mongoose';

interface IAyuda {
  trigger: string;
  answer: string;
}

type AyudaModel = Model<IAyuda>;

const ayudaSchema = new Schema<IAyuda, AyudaModel>(
  {
    trigger: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { collection: 'ayuda' }
);

export const Ayuda = model<IAyuda, AyudaModel>('Ayuda', ayudaSchema);
export type AyudaDocument = Document & IAyuda;
