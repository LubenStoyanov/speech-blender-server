import jwt from "jsonwebtoken";
import { User } from "./models/user.js";
import { privateKey } from "./server.js";

export default async (req, res, next) => {
  const token = req.cookies.token;
  console.log("validate", token);
  if (!token) {
    console.log("No token");
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(token, privateKey);
    const { _id } = data;
    await User.findOne({ _id: _id });
    req.userId = _id;
    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(403);
  }
};
