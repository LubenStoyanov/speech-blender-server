import mongoose, { Schema } from "mongoose";
const podcastSchema = new Schema( //TODO don't send real ID
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
      unique: 1,
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
  if (this.publicId === "") this.publicId = Math.random() * 10000000;
  next();
});

export const Podcast = mongoose.model("Podcast", podcastSchema);
