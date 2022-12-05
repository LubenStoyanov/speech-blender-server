import { Collaborater } from "../models/collaborater.js";
import { User } from "../models/user.js";

export const addCollaborater = async (req, res) => {
  const { username, podcastId } = req.body;
  console.log("username", username);
  console.log("podcastId", podcastId);
  try {
    const [user] = await User.find({ username: username }); // Change to cookie
    console.log("user", user);
    await Collaborater.create({
      userId: user._id,
      podcastId: podcastId,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
