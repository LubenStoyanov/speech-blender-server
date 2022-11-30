import express from "express";
import { getUsersAll } from "../controller/users.js";

export default express.Router().get("/", getUsersAll);
