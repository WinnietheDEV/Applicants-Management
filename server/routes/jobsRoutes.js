const express = require("express");
const {
  getAllJobs,
  getJobsDetail,
  createJob,
} = require("../controller/jobsController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJobsDetail);

module.exports = router;
