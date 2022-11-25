import jwt from "jsonwebtoken";
// import { User } from "./models/user.js";
import { privateKey } from "./server.js";

export const setCookie = async (req, res, next) => {
  // const { username } = req.body;
  // const user = await User.findOne({ username: username }, "password");
  const token = req.cookies.token;
  const userId = req.userId;
  if (token === undefined) {
    const token = jwt.sign({ _id: userId }, privateKey);
    console.log("Setting cookie");
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({ message: "Logged in" });
  }

  return res.sendStatus(403);
};
