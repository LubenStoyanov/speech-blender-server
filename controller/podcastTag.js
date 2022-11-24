import connectDB from "../db.js";
import { PodcastTag } from "../models/podcastTag.js";

export const createPodcastTag = async (req, res) => {
  try {
    connectDB();
    const podcastTag = await PodcastTag.create(req.body);
    res.sendStatus(201)
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getPodcastTag = async (req, res) => {
  try {
    connectDB();
    const podcastTag = await PodcastTag.find();
    res.status(200).json(podcastTag);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export const getDeletePodcastTag = async (req, res) => {
  try {
    const { publicId } = req.body;
    connectDB();
    await PodcastTag.deleteOne({
      publicId: publicId,
    });

    res.status(200).send("Tag deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};