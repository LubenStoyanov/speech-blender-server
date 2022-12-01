import express from "express";
import { register, login, logout } from "../controller/auth.js";
import { checkDuplicateUser } from "../error.js";

export default express
  .Router()
  .get("/", (req, res) => res.send("Hello"))
  .post("/register", checkDuplicateUser, register)
  .post("/login", login)
  .post("/logout", logout);
