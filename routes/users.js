const express = require("express");
const {
  userRegister,
  getUserDetail,
} = require("../controllers/userController");

const userRouter = express.Router();

// user register
userRouter.post("/register", userRegister);
userRouter.get("/:id", getUserDetail);

module.exports = userRouter;
