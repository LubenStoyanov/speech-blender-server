import express from "express";
import {
  createPodcast,
  getDeletePodcast,
  getSearchPodcast,
  getPodcastsAll,
} from "../controller/podcast.js";
import { checkExistsPodcast } from "../error.js";

export default express
  .Router()
  .get("/all", getPodcastsAll)
  .post("/create-podcast", createPodcast)
  .delete("/delete", checkExistsPodcast, getDeletePodcast)
  .get("/search/:query", getSearchPodcast);
