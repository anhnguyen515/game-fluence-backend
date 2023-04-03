const express = require("express");
const { userRegister } = require("../controllers/userController");

const userRouter = express.Router();

// user register
userRouter.post("/register", userRegister);

module.exports = userRouter;
