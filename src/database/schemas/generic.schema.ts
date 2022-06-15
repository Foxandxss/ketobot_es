import { Document, model, Schema } from 'mongoose';

export interface IGeneric {
  trigger: string;
  answer: string;
}

const genericSchema = new Schema<IGeneric>(
  {
    trigger: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { collection: 'commands' }
);

export const Generic = model<IGeneric>('Generic', genericSchema);
export type GenericDocument = Document & IGeneric;
