import connectDB from "../db.js";
import { Recording } from "../models/recording.js";

export const createRecording = async (req, res) => {
  try {
    console.log("recording");
    const recording = await Recording.create(req.body);
    res.status(201).json({
      publicId: recording.publicId,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getRecordingsAll = async (req, res) => {
  try {
    const { podcastId } = req.params;
    // await Recording.deleteMany({});
    const recordingsAll = await Recording.find({ podcastId: podcastId });
    console.log(recordingsAll);
    res.status(200).json(recordingsAll);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
