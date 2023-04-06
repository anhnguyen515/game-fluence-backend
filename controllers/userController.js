const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/constants");

const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "3d" });
};

const userRegister = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.json({
      ok: false,
      msg: "All fields must be filled",
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({
      ok: false,
      msg: "Email is not valid",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.json({
      ok: false,
      msg: "Password must contains at least 8 characters, including 1 lower case, 1 upper case and 1 symbol",
    });
  }

  const emailExisted = await User.findOne({ email });

  if (emailExisted) {
    return res.json({
      ok: false,
      msg: "Email has already been taken",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  User.create({ email, password: hash })
    .then((r) => {
      // create jwt token
      const jwtToken = createToken(r._id);
      res.json({
        ok: true,
        token: jwtToken,
      });
    })
    .catch((err) =>
      res.json({
        ok: false,
        msg: err.message,
      })
    );
};

const getUserDetail = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((r) =>
      res.json({
        ok: true,
        user: r,
      })
    )
    .catch((err) =>
      res.json({
        ok: false,
        msg: "User does not exist",
      })
    );
};

module.exports = { userRegister, getUserDetail };
