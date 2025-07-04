import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string; // hashed password
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("users", UserSchema);
