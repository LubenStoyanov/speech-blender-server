import { decode } from "../decode.js";
import connectDB, { Podcast, User } from "../models/db.js";

export const createPodcast = async (req, res) => {
  try {
    connectDB();
    await Podcast.create(req.body);
    res.status(201).send("Podcast created");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getPodcastsAll = async (req, res) => {
  try {
    connectDB();
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
    connectDB();
    const searchPodcast = await Podcast.find({
      title: { $regex: "^" + query },
    });
    res.status(200).json(searchPodcast);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getUpdatePodcast = async (req, res) => {
  try {
    const { token } = req.body;
    connectDB();
    const user = await decode(token);
    const updatePodcast = await Podcast.deleteOne({ title: title, _id: id });
    res.status(200).json(updatePodcast);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
