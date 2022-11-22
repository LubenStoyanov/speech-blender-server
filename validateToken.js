import jwt from "jsonwebtoken";
import { privateKey } from "./server.js";

export default (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, privateKey, (err, username) => {
    if (err) {
      console.log("Invalid token.");
      res.sendStatus(403);
    } else {
      req.username = username;
      next();
    }
  });
};
