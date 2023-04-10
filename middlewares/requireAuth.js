const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      ok: false,
      msg: "Authorization token required",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, JWT_SECRET);
    // find user with _id, return user data with only _id field
    // the next middleware will be able to access user via req.user
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    res.json({
      ok: false,
      msg: err.message,
    });
  }
};

module.exports = requireAuth;
