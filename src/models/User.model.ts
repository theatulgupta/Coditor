import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  displayPicture: string;
  password: string;
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    displayPicture: { type: String, default: "" },
    password: { type: String, required: true },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);

UserSchema.pre(
  "save",
  async function (this: UserType & mongoose.Document, next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
