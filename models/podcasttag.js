import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema } from "mongoose";

const podcastTagSchema = new Schema({
  publicId: {
    type: String,
    default: "",
    unique: 1,
  },
  podcastId: {
    type: String,
    required: true,
    unique: 1,
  },
  tagId: {
    type: String,
    required: true,
    unique: 1,
  },
});

podcastTagSchema.pre("save", async function (next) {
  if (this.publicId === "") this.publicId = uuidv4();
  next();
});

export const PodcastTag = mongoose.model("PodcastTag", podcastTagSchema);
