const express = require("express");
const {
  postApplicant,
  getAllApplicants,
  getApplicantDetail,
  deleteApplicant,
} = require("../controller/applicantController");
const router = express.Router();

router.route("/").post(postApplicant).get(getAllApplicants);

router.route("/:id").get(getApplicantDetail).delete(deleteApplicant);

module.exports = router;
