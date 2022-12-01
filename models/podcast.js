import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema } from "mongoose";
const podcastSchema = new Schema(
  {
    publicId: {
      type: String,
      default: "",
      unique: 1,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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
podcastSchema.pre("save", async function (next) {
  if (this.publicId === "") this.publicId = uuidv4();
  next();
});

export const Podcast = mongoose.model("Podcast", podcastSchema);
