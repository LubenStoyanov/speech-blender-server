import express from "express";
import {
    createFavorite,
    getFavorite,
    getDeleteFavorite,
} from "../controller/favorite.js";
import { checkExistsFavorite } from "../error.js";

export default express
    .Router()
    .get("/all", getFavorite)
    .post("/create-favorite", createFavorite)
    .delete("/delete-favorite", checkExistsFavorite, getDeleteFavorite);