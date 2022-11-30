import mongoose, { Schema } from "mongoose";

const recordingSchema = new Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Recording = mongoose.model("Recording", recordingSchema);
