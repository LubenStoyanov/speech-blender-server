import connectDB, { User } from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from "../server.js";
const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    connectDB();
    const hashedPW = await bcrypt.hash(password, saltRounds);
    const token = jwt.sign({ username: username }, privateKey);

    await User.create({
      username: username,
      email: email,
      password: hashedPW,
      token: token,
    });

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    connectDB();
    const user = await User.findOne({ username: username }, "password");

    const loginVerified = await bcrypt.compare(password, user.password);
    if (!loginVerified) return res.status(401).send("Wrong Password");
    const token = jwt.sign({ username: username }, privateKey);

    await User.updateOne({ username: username }, { $set: { token: token } });
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const logout = async (req, res) => {
  try {
    const { username } = req.body;

    connectDB();
    await User.updateOne({ username: username }, { $set: { token: null } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
