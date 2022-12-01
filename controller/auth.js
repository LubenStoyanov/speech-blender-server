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

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username }, "password");
    if (!user) return res.sendStatus(404);

    const loginVerified = await bcrypt.compare(password, user.password);
    if (!loginVerified) return res.status(401).send("Wrong Password");

    const token = jwt.sign({ _id: user._id }, privateKey);
    console.log(token, "Setting cookie");
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        // sameSite: "strict",
        maxAge: 900000,
      })
      .status(200)
      .json({ message: "Logged in" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const logout = async (req, res) => {
  console.log("logout");
  console.log(req.cookies.token);
  try {
    res.clearCookie("token", { path: "/" }).sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
