import express from "express";
import { addCollaborater } from "../controller/collaborater.js";

export default express.Router().post("/add", addCollaborater);
