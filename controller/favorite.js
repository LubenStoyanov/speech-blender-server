import { Favorite } from "../models/favorite.js";
import { privateKey } from "../server.js";
import jwt from "jsonwebtoken";
import { Podcast } from "../models/podcast.js";
import mongoose from "mongoose";

export const createFavorite = async (req, res) => {
  const { podcastId } = req.body;
  const token = req.cookies.token;
  const user = jwt.verify(token, privateKey);
  console.log("podId", podcastId);
  console.log("token", token);
  console.log("user", user);
  try {
    const favorite = await Favorite.create({
      podcastId: podcastId,
      userId: user._id,
    });
    console.log(favorite);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getFavorite = async (req, res) => {
  // await Favorite.deleteMany();
  const token = req.cookies.token;
  const user = jwt.verify(token, privateKey);
  console.log("getFav ", user);
  try {
    const favorite = await Favorite.find({ userId: user._id }, "podcastId");
    const mappedFavorite = favorite.map((f) =>
      mongoose.Types.ObjectId(f.podcastId)
    );
    const podcasts = await Podcast.find({
      _id: { $in: mappedFavorite }, //mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
    });
    console.log("mapped", podcasts);
    console.log("getfavorite", favorite);
    res.status(200).json(podcasts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getDeleteFavorite = async (req, res) => {
  try {
    const { publicId } = req.body;
    await Favorite.deleteOne({
      publicId: publicId,
    });

    res.status(200).send("Podcast deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
