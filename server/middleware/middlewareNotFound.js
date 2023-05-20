const { StatusCodes } = require("http-status-codes");

const middlewareErrNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "page not found" });
};

module.exports = middlewareErrNotFound;
