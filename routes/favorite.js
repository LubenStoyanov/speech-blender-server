import express from "express";
import {
  createFavorite,
  getFavorite,
  unlikeFavorite,
} from "../controller/favorite.js";
import { checkExistsFavorite } from "../error.js";

export default express
  .Router()
  .get("/all", getFavorite)
  .post("/create-favorite", createFavorite)
  .put("/unlike", checkExistsFavorite, unlikeFavorite);
