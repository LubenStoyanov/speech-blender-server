import express from "express";
import multer, { memoryStorage } from "multer";
const storage = memoryStorage();
const upload = multer({ storage });
import uploadAudio from "../controller/uploadAudio.js";

export default express.Router().post("/", upload.single("file"), uploadAudio);
