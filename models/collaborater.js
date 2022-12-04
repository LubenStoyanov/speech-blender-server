import mongoose, { Schema } from "mongoose";

const collaboraterSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  podcastId: {
    type: String,
    required: true,
  },
});

export const Collaborater = mongoose.model("Collaborater", collaboraterSchema);
