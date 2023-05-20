const Job = require("../model/Job");
const { BadRequestError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  console.log(jobs);
  res.status(StatusCodes.OK).json(jobs);
};

const getJobsDetail = (req, res) => {
  const id = req.params.id;
  res.send(`jobId:${id} job detail`);
};

const createJob = async (req, res) => {
  const { title, description, available, requirement } = req.body;
  if (!title || !description || !available || !requirement) {
    throw new BadRequestError();
  }
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

module.exports = { getAllJobs, getJobsDetail, createJob };
