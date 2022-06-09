import { Document, model, Schema } from 'mongoose';

interface IAyuda {
  trigger: string;
  answer: string;
}

const ayudaSchema = new Schema<IAyuda>(
  {
    trigger: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { collection: 'ayuda' }
);

export const Ayuda = model<IAyuda>('Ayuda', ayudaSchema);
export type AyudaDocument = Document & IAyuda;
