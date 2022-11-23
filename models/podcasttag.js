const podcastTagSchema = new Schema({
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
export const PodcastTag = mongoose.model("PodcastTag", podcastTagSchema);
