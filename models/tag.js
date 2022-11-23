const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: 1,
  },
});

export const Tag = mongoose.model("Tag", tagSchema);
