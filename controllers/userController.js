const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const userRegister = async (req, res) => {
  const { email, password } = req.body;
  const emailExisted = await User.findOne({ email });

  if (emailExisted) {
    res.json({
      ok: false,
      msg: "Email has already been taken",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // const dbUser = new User({
    //   email,
    //   password: hash,
    // });
    // dbUser.save();
    User.create({ email, password: hash })
      .then(() =>
        res.json({
          ok: true,
          msg: "Successfully registered!",
        })
      )
      .catch((err) => res.json({ ok: false, msg: err.message }));
  }
};

module.exports.userRegister = userRegister;
