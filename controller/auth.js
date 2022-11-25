import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from "../server.js";
const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPW = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPW,
    });

    const token = jwt.sign(JSON.stringify(user), privateKey);
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username }, "password");

    const loginVerified = await bcrypt.compare(password, user.password);
    if (!loginVerified) return res.status(401).send("Wrong Password");
    req.userId = user._id;
    return next();
    // res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
