import mongoose, { Schema } from "mongoose";

const avatarSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export const Avatar = mongoose.model("Avatar", avatarSchema);
