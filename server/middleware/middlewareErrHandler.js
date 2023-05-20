const { StatusCodes } = require("http-status-codes");

const middlewareErrHandler = (err, req, res, next) => {
  let errInfo = {
    msg: err.message || "something went wrong",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.message === "user validation failed: email: email is invalid") {
    errInfo.msg = "invalid email format";
    errInfo.statusCode = StatusCodes.BAD_REQUEST;
  }
  // return res.status(errInfo.statusCode).json(err);
  return res.status(errInfo.statusCode).json({ msg: errInfo.msg });
};

module.exports = middlewareErrHandler;
