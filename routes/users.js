const express = require("express");
const {
  userLogin,
  userRegister,
  getUserDetail,
} = require("../controllers/userController");

const userRouter = express.Router();

// user register
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/:id", getUserDetail);

module.exports = userRouter;
