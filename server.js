import express from "express";
import helmet from "helmet";
import cors from "cors";
import validateToken from "./validateToken.js";
import authRouter from "./routes/auth.js";
import podcastRouter from "./routes/podcast.js";
import { upload } from "./controller/upload.js";
import recordingRouter from "./routes/recording.js";
import favoriteRouter from "./routes/favorite.js";
import tagRouter from "./routes/tag.js";
import podcastTagRouter from "./routes/podcastTag.js";

export const privateKey = process.env.PRIVATE_KEY;
const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/podcast", podcastRouter);
app.use("/upload", upload);
app.use("/recording", recordingRouter);
app.use("/favorite", favoriteRouter);
app.use("/tag", tagRouter);
app.use("/podcast-tag", podcastTagRouter);

app.post("/profile/:username", validateToken, (req, res) => {
  console.log("Token is valid.");
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);