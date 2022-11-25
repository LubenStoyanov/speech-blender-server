import jwt from "jsonwebtoken";
// import { User } from "./models/user.js";
import { privateKey } from "./server.js";

export const setCookie = async (req, res, next) => {
  const token = req.cookies.token;
  // const { username } = req.body;
  // const user = await User.findOne({ username: username }, "password");
  const userId = req.userId;
  if (token === undefined) {
    const token = jwt.sign({ _id: userId }, privateKey);
    console.log("Setting cookie");
    return res
      .cookie("token", token, {
        httpOnly: false,
        // secure: false,
      })
      .status(200)
      .json({ message: "Logged in" });
  }

  next();
};
