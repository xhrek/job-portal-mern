const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
try {
console.log("BODY:", req.body);

const job = await Job.create(req.body);

res.status(201).json({
  message: "Job created successfully",
  job,
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get All Jobs (Search + Pagination)
const getJobs = async (req, res) => {
try {
const { keyword, location, page = 1, limit = 5 } = req.query;


let filter = {};

if (keyword) {
  filter.title = {
    $regex: keyword,
    $options: "i",
  };
}

if (location) {
  filter.location = {
    $regex: location,
    $options: "i",
  };
}

const totalJobs = await Job.countDocuments(filter);

const jobs = await Job.find(filter)
  .skip((Number(page) - 1) * Number(limit))
  .limit(Number(limit));

res.status(200).json({
  totalJobs,
  currentPage: Number(page),
  totalPages: Math.ceil(totalJobs / Number(limit)),
  jobs,
});


} catch (error) {
console.log(error);

res.status(500).json({
  message: error.message,
});


}
};

// Get Job By ID
const getJobById = async (req, res) => {
try {
const job = await Job.findById(req.params.id);

if (!job) {
  return res.status(404).json({
    message: "Job not found",
  });
}

res.status(200).json(job);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Update Job
const updateJob = async (req, res) => {
try {
const job = await Job.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
runValidators: true,
}
);


if (!job) {
  return res.status(404).json({
    message: "Job not found",
  });
}

res.status(200).json({
  message: "Job updated successfully",
  job,
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Delete Job
const deleteJob = async (req, res) => {
try {
const job = await Job.findByIdAndDelete(req.params.id);


if (!job) {
  return res.status(404).json({
    message: "Job not found",
  });
}

res.status(200).json({
  message: "Job deleted successfully",
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

module.exports = {
createJob,
getJobs,
getJobById,
updateJob,
deleteJob,
};
