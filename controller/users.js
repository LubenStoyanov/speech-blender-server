import { User } from "../models/user.js";

export const getUsersAll = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const users =
      username === "all"
        ? await User.find()
        : await User.find({ username: username }, "username");
    res.status(200).json(users);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};
