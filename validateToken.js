import jwt from "jsonwebtoken";
import { User } from "./models/user.js";
import { privateKey } from "./server.js";

export default async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader.split(" ")[1];

  const decoded = jwt.verify(token, privateKey);
  const { _id } = decoded;
  const user = await User.findOne({ _id: _id });
  if (!user) return res.sendStatus(404);
  next();
};
