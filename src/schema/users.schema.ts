import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    name: { type: "String", required: true },
    age: { type: "Number", required: true },
    mobileNumber: { type: "Number", required: true },
  },
  { timestamps: true }
);

export const Users = model("Users", UserSchema);
