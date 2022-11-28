import { uploadAudio } from "../aws.js";
export default async (req, res) => {
  const filename = "test"; // TODO get from req.body
  const bucketName = "sound-bits";
  console.log("req", req);
  console.log("body", req.body);
  console.log("file", req.body.file);
  // const file = req.body.file;

  // const link = await uploadAudio(filename, bucketName, file);
  // res.send(link);
};
