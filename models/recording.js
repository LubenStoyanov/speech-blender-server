import mongoose, { Schema } from "mongoose";

const recordingSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    podcastId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Recording = mongoose.model("Recording", recordingSchema);
