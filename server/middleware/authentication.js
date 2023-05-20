const jwt = require("jsonwebtoken");
const { UnauthError } = require("../errors");
require("dotenv").config();

const authentication = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new UnauthError("unauthorized user");
  }
  const reqToken = auth.split(" ")[1];

  const verifiedToken = jwt.verify(reqToken, process.env.JWT_SECRET);
  if (verifiedToken) {
    req.user = {
      username: verifiedToken.username,
      userID: verifiedToken._id,
    };
  } else {
    throw new UnauthError("unauthorized user");
  }
  next();
};

module.exports = authentication;
