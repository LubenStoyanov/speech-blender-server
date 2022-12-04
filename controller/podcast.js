import jwt from "jsonwebtoken";
import { privateKey } from "../server.js";
import { Podcast } from "../models/podcast.js";
import { Recording } from "../models/recording.js";
import { s3 } from "../aws.js";
import { Collaborater } from "../models/collaborater.js";
import mongoose from "mongoose";

export const createPodcast = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, privateKey);
  console.log("token", token);
  console.log("createP", req.body);
  try {
    const podcast = await Podcast.create({ ...req.body, userId: user._id });
    await Collaborater.create({ userId: user._id, podcastId: podcast._id });
    res.status(201).json({ podcastId: podcast._id });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getUserPodcasts = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, privateKey);
  try {
    // await Podcast.deleteMany({});
    console.log("user", user);
    const podcastsCollab = await Collaborater.find({ userId: user._id });
    const podcastIds = podcastsCollab.map((c) =>
      mongoose.Types.ObjectId(c.podcastId)
    );
    console.log("podcastIds", podcastIds);
    const podcasts = await Podcast.find({ _id: { $in: podcastIds } });
    console.log("user", podcasts);
    res.status(200).json(podcasts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
export const getPodcastsAll = async (req, res) => {
  try {
    // await Podcast.deleteMany({});
    const podcastsAll = await Podcast.find();
    console.log(podcastsAll);
    // podcastsAll.forEach(async (p) => {
    //   const recordings = await Recording.find({ podcastId: p._id }, "url");
    //   console.log("map", recordings);
    //   return { ...p, recordings: recordings };
    //   // return 1;
    // });
    // // console.log("podcasts", podcastsRecordings);
    // console.log("podcasts", podcastsAll);
    // res.status(200).json(podcastsRecordings);
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
    const { podcastId } = req.params;
    console.log("podcastId", podcastId);
    await Podcast.deleteOne({
      _id: podcastId,
    });
    const recordings = await Recording.find({ podcastId: podcastId }, "url");
    recordings.forEach((r) => {
      const params = {
        Bucket: "sound-bits",
        Key: r.url.split("/")[3],
      };
      s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });
    });
    await Recording.deleteMany({ podcastId: podcastId });
    res.status(200).send("Podcast deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
