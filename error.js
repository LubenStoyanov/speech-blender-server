import connectDB from "./db.js";
import { User } from "./models/user.js";
import { Podcast } from "./models/podcast.js";

export const checkDuplicateUser = async (req, res, next) => {
  const { username, email } = req.body;
  connectDB();
  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res.status(409).json({
      error: "email",
    });

  const usernameExists = await User.findOne({ username: username });
  if (usernameExists)
    return res.status(409).json({
      error: "username",
    });

  next();
};
export const checkExistsPodcast = async (req, res, next) => {
  const { publicId } = req.body;
  connectDB();
  const podcastExists = await Podcast.findOne({
    publicId: publicId,
  });
  if (!podcastExists)
    return res.status(404).json({
      error: "No entry found",
    });

  next();
};
