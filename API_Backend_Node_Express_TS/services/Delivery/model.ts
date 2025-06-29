import { Schema, model, Document } from "mongoose";

export interface IDelivery extends Document {
  entregadorId: string;       // ID del entregador (referencia al User)
  qrCode: string;             // Código escaneado
  location: {
    lat: number;
    lng: number;
  };
  deliveredAt: Date;          // Fecha/hora de entrega
}

const deliverySchema = new Schema<IDelivery>({
  entregadorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  qrCode: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  deliveredAt: { type: Date, default: Date.now },
});

export const Delivery = model<IDelivery>("Delivery", deliverySchema);
