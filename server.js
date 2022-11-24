import express from "express";
// import S3 from "aws-sdk/clients/s3";
import helmet from "helmet";
import cors from "cors";
import validateToken from "./validateToken.js";
import authRouter from "./routes/auth.js";
import podcastRouter from "./routes/podcast.js";
import recordingRouter from "./routes/recording.js";

export const privateKey = process.env.PRIVATE_KEY;
const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/podcast", podcastRouter);
app.use("/recording", recordingRouter);

app.post("/profile/:username", validateToken, (req, res) => {
  console.log("Token is valid.");
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);