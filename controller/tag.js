import connectDB from "../db.js";
import { Tag } from "../models/tag.js";

export const createTag = async (req, res) => {
  try {
    connectDB();
    const tag = await Tag.create(req.body);
    res.sendStatus(201)
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getTag = async (req, res) => {
  try {
    connectDB();
    const tag = await Tag.find();
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
