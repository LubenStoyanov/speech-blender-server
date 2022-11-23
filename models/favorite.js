import mongoose, { Schema } from "mongoose";
export const Favorite = mongoose.model("Favorite", favoriteSchema);
const favoriteSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: 1,
  },
  podcastId: {
    type: String,
    required: true,
    unique: 1,
  },
});
