import { User } from "../models/user.js";

export const getUsersAll = async (req, res) => {
  try {
    const users = await User.find({}, "username");
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};
