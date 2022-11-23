import fs from "fs";
import { uploadAudio } from "../aws.js";
export const upload = async (req, res) => {
  const filename = "get-got"; // TODO get from req.body
  const bucketName = "sound-bits";
  // const file = req.file.buffer;
  const file = fs.readFileSync("test.mp3");
  const link = await uploadAudio(filename, bucketName, file);
  res.send(link);
};
