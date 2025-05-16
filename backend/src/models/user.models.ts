import mongoose, { Document, Schema, Model, Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  fullname: string;
  bio?:string,
  password: string;
  lastLoginAt: Date;
  creditPoints: number;
  refreshToken?: string;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    creditPoints: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (this: IUser): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "1m",
    }
  );
};

userSchema.methods.generateRefreshToken = function (this: IUser): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "1d",
    }
  );
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
