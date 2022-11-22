import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { Schema } from "mongoose";

export default () => mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: 1,
    },
    email: { type: String, required: true, unique: 1 },
    password: { type: String, required: true },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const podcastSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    description: {
      type: String,
    },
    private: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

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
  { timestamps: true }
);

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
  },
});

const podcastTagSchema = new Schema({
  podcastId: {
    type: String,
    required: true,
  },
  tagId: {
    type: String,
    required: true,
  },
});

const favoriteSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  podcastId: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Podcast = mongoose.model("Podcast", podcastSchema);
export const Recording = mongoose.model("Recording", recordingSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const Favorite = mongoose.model("Favorite", favoriteSchema);
export const PodcastTag = mongoose.model("PodcastTag", podcastTagSchema);
