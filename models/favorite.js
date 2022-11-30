import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema } from "mongoose";
const favoriteSchema = new Schema({
  publicId: {
    type: String,
    default: "",
    unique: 1,
  },
  userId: {
    type: String,
    required: true,
  },
  podcastId: {
    type: String,
    required: true,
    unique: 1,
  },
});

favoriteSchema.pre("save", async function (next) {
  if (this.publicId === "") this.publicId = uuidv4();
  next();
});
export const Favorite = mongoose.model("Favorite", favoriteSchema);
