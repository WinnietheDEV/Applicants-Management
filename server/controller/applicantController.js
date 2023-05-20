const applicationData = require("../data/applicationData");
const Applicant = require("../model/Applicant");
const User = require("../model/User");
const Job = require("../model/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllApplicants = async (req, res) => {
  const applicants = await Applicant.find();

  const users = await User.find();
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ applicants, users, jobs });
};

const getApplicantDetail = (req, res) => {
  const id = req.params.id;
  const applicant = applicationData.filter((app) => app["id"] === Number(id));
  res.json(applicant);
};

const postApplicant = async (req, res) => {
  const { userId, jobId } = req.body;
  // console.log(userId, jobId);
  console.log("come");
  const applicant = await Applicant.create(req.body);
  res.status(StatusCodes.OK).json({ applicant });
};

const deleteApplicant = async (req, res) => {
  const id = req.params.id;

  const applicant = await Applicant.findOneAndDelete({ _id: id });
  if (!applicant) {
    throw new NotFoundError(`no applicant with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "success delete" });
};

module.exports = {
  getAllApplicants,
  postApplicant,
  getApplicantDetail,
  deleteApplicant,
};
