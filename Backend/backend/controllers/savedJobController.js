const SavedJob = require("../models/SavedJob");

// Save a Job
const saveJob = async (req, res) => {
try {
const { userId, jobId } = req.params;

const existing = await SavedJob.findOne({
  user: userId,
  job: jobId,
});

if (existing) {
  return res.status(400).json({
    message: "Job already saved",
  });
}

const savedJob = await SavedJob.create({
  user: userId,
  job: jobId,
});

res.status(201).json({
  message: "Job saved successfully",
  savedJob,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get Saved Jobs of User
const getSavedJobs = async (req, res) => {
try {
const savedJobs = await SavedJob.find({
user: req.params.userId,
}).populate("job");

res.status(200).json(savedJobs);

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Remove Saved Job
const deleteSavedJob = async (req, res) => {
try {
const savedJob = await SavedJob.findByIdAndDelete(req.params.id);

if (!savedJob) {
  return res.status(404).json({
    message: "Saved job not found",
  });
}

res.status(200).json({
  message: "Saved job removed successfully",
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

module.exports = {
saveJob,
getSavedJobs,
deleteSavedJob,
};