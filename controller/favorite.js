import connectDB from "../db.js";
import { Favorite } from "../models/favorite.js";

export const createFavorite = async (req, res) => {
  try {
    connectDB();
    const podcast = await Favorite.create(req.body);
    res.sendStatus(201)
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

export const getDeleteFavorite = async (req, res) => {
  try {
    const { publicId } = req.body;
    connectDB();
    await Favorite.deleteOne({
      publicId: publicId,
    });

    res.status(200).send("Podcast deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};