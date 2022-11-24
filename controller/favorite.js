import connectDB from "../db.js";
import { Favorite } from "../models/favorite.js";

export const createFavorite = async (req, res) => {
  try {
    connectDB();
    const podcast = await Favorite.create(req.body);
    res.status(201).json({ publicId: podcast.publicId });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getFavorite = async (req, res) => {
  try {
    connectDB();
    const favorite = await Favorite.find();
    res.status(200).json(favorite);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}