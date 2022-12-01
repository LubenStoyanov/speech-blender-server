import connectDB from "../db.js";
import jwt from "jsonwebtoken";
import { privateKey } from "../server.js";
import { Podcast } from "../models/podcast.js";

export const createPodcast = async (req, res) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, privateKey);
    console.log({ ...req.body, userId: user._id });
    console.log(req.body);
    const podcast = await Podcast.create({ ...req.body, userId: user._id });
    res.status(201).json({ publicId: podcast.publicId });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getPodcastsAll = async (req, res) => {
  try {
    // await Podcast.deleteMany({});
    const podcastsAll = await Podcast.find();
    res.status(200).json(podcastsAll);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getSearchPodcast = async (req, res) => {
  try {
    const { query } = req.params;
    const searchPodcast = await Podcast.find({
      title: { $regex: "^" + query },
    });
    res.status(200).json(searchPodcast);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getDeletePodcast = async (req, res) => {
  console.log("delete");
  try {
    const { publicId } = req.body;
    console.log(publicId);
    await Podcast.deleteOne({
      publicId: publicId,
    });

    res.status(200).send("Podcast deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
