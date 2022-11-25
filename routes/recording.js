import express from "express";
import {
    createRecording,
    getRecordingsAll,
} from "../controller/recording.js";

export default express
    .Router()
    .get("/all", getRecordingsAll)
    .post("/create-recording", createRecording);