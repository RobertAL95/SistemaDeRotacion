import mongoose, { Schema, Document } from "mongoose";

export type Role = "supervisor" | "entregador";

export interface IUser extends Document {
  username: string;
  password: string;
  roles: Role[];
  organizationId: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [String],
    enum: ["supervisor", "entregador"],
    default: ["entregador"],
  },
  organizationId: { type: String, required: true }, // NUEVO
});

export const User = mongoose.model<IUser>("User", UserSchema);
