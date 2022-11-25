import express from "express";
import {
    createTag,
    getTag,
} from "../controller/tag.js";

export default express
    .Router()
    .get("/all", getTag)
    .post("/create-tag", createTag);