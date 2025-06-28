import mongoose, { Schema, Document } from "mongoose";

export interface IEntregador extends Document {
  email: string;
  password: string;
  organizationId: string;
  role: string;
}

const EntregadorSchema = new Schema<IEntregador>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizationId: { type: String, required: true },
  role: { type: String, default: "entregador" },
});

export const Entregador = mongoose.model<IEntregador>("Entregador", EntregadorSchema);
