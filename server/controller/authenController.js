const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { email, password: reqPassword } = req.body;

  if (!email) {
    throw new BadRequestError("email is not valid");
  }

  if (!reqPassword) {
    throw new BadRequestError("password is not valid");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("user is not exist");
  }
  const { password, username, _id } = user;

  const comparePassword = await bcrypt
    .compare(reqPassword, user.password)
    .then((result) => result);

  let token;
  if (comparePassword) {
    token = jwt.sign({ username, _id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
  } else {
    throw new BadRequestError("incorrect password");
  }
  res.json({ msg: "login success", user, token });
};

const register = async (req, res) => {
  const {
    name: reqUsername,
    password: reqPassword,
    email: reqEmail,
    surname: reqSurname,
  } = req.body;

  if (!reqEmail) {
    throw new BadRequestError("email is not valid");
  }

  if (!reqPassword) {
    throw new BadRequestError("password is not valid");
  }
  if (!reqUsername) {
    throw new BadRequestError("username is not valid");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(reqPassword, salt);
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const status = isFirstAccount ? "admin" : "user";
  const user = await User.create({
    name: reqUsername,
    surname: reqSurname,
    password: hashedPassword,
    email: reqEmail,
    status,
  });

  res.status(StatusCodes.OK).json({ msg: "register success" });
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
