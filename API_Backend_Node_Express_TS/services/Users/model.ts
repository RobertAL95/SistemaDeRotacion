import mongoose, { Schema, Document } from "mongoose";

export type Role = "supervisor" | "entregador";

export interface IUser extends Document {
  username: string;
  password: string;
  roles: Role[];
  organizationId: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["supervisor", "entregador"],
      required: true, // es obligatorio definir el rol al crear el usuario
    },
    organizationId: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("users", UserSchema);
