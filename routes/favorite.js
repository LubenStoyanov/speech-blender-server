import express from "express";
import {
    createFavorite,
    getFavorite,
    deleteFavorite,
} from "../controller/favorite.js";

export default express
    .Router()
    .get("/all", getFavorite)
    .post("/create-recording", createFavorite)
    .delete("/delete-recording", deleteFavorite);