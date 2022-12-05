import express from "express";
import { avatarController, getAvatar } from "../controller/avatar.js";
import multer, { memoryStorage } from "multer";
const storage = memoryStorage();
const upload = multer({ storage });

export default express
  .Router()
  .post("/", upload.single("file"), avatarController)
  .get("/", getAvatar);
