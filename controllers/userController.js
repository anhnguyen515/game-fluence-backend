const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const userRegister = async (req, res) => {
  const user = req.body;
  const usernameExisted = await User.findOne({ username: user.username });
  const emailExisted = await User.findOne({ email: user.email });

  if (usernameExisted) {
    res.json({
      ok: false,
      message: "Username has already been taken.",
    });
  } else if (emailExisted) {
    res.json({
      ok: false,
      message: "Email has already been taken",
    });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);
    const dbUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    dbUser.save();
    res.json({
      ok: true,
      message: "Successfully registered!",
    });
  }
};

module.exports.userRegister = userRegister;
