import express from "express";
import { register, login, logout } from "../controller/controller.js";
import { checkDuplicate } from "../error.js";

export default express
  .Router()
  .post("/register", checkDuplicate, register)
  .post("/login", login)
  .post("logout", logout);
