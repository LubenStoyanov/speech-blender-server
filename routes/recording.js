import express from "express";
import { createRecording, getRecordingsAll } from "../controller/recording.js";

export default express
  .Router()
  .get("/all/:podcastId", getRecordingsAll)
  .post("/create-recording", createRecording);
