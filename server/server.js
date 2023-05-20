require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const applicantRouter = require("./routes/applicantRoutes");
// import router
const jobRouter = require("./routes/jobsRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");

// import error middle ware
const middlewareNotFound = require("./middleware/middlewareNotFound");
const middlewareErrHandler = require("./middleware/middlewareErrHandler");

// use cors to allow fetching from different domain
app.use(cors());

const connectDB = require("./db/connect");

app.use(express.json());
// match api to particular router
app.use("/tofu/auth", authRouter);
app.use("/tofu/users", userRouter);
app.use("/tofu/jobs", jobRouter);
app.use("/tofu/applicants", applicantRouter);

// use middleware to deal with Error
app.use(middlewareErrHandler);
// use middleware to deal with Not found error
app.use(middlewareNotFound);

const port = process.env.PORT || 3000;

// start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
