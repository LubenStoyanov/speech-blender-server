import express from "express";
import { register, login, logout } from "../controller/auth.js";
import { setCookie } from "../cookie.js";
import { checkDuplicateUser } from "../error.js";

export default express
  .Router()
  .post("/register", checkDuplicateUser, register)
  .post("/login", login)
  .post("/logout", logout);
