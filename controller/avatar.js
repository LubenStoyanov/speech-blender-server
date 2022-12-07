import { uploadAvatar } from "../aws.js";
import crypto from "crypto";
import { Avatar } from "../models/avatar.js";
import { privateKey } from "../server.js";
import jwt from "jsonwebtoken";
import { s3 } from "../aws.js";

export const avatarController = async (req, res) => {
  console.log("avatarController");
  const filename = crypto.randomBytes(32).toString("hex");
  const bucketname = "sound-bits";
  const file = req.file.buffer;
  const token = req.cookies.token;
  const user = jwt.verify(token, privateKey);
  console.log("file", file);
  try {
    const avatar = await Avatar.findOne({ userId: user._id });
    const link = await uploadAvatar(filename, bucketname, file);
    if (avatar) {
      const params = {
        Bucket: "sound-bits",
        Key: avatar.url.split("/")[3],
      };
      s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      });
      await Avatar.findOneAndUpdate({ userId: user._id }, { url: link });
      res.status(200).json(link);
    } else {
      await Avatar.create({ userId: user._id, url: link });
      res.status(200).json(link);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getAvatar = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, privateKey);
      const url = await Avatar.findOne({ userId: user._id });
      res.status(200).json(url);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.status(500).send("No token");
  }
};
