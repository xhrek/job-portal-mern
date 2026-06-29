const Job = require("../models/Job");
const Application = require("../models/Application");

const recruiterStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({
      recruiterId: req.params.recruiterId
    });

    const totalApplications =
      await Application.countDocuments();

    const accepted =
      await Application.countDocuments({
        status: "accepted"
      });

    const rejected =
      await Application.countDocuments({
        status: "rejected"
      });

    const pending =
      await Application.countDocuments({
        status: "pending"
      });

    res.status(200).json({
      totalJobs,
      totalApplications,
      accepted,
      rejected,
      pending
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const candidateStats = async (req, res) => {
  try {
    const totalApplied =
      await Application.countDocuments({
        applicant: req.params.userId
      });

    const accepted =
      await Application.countDocuments({
        applicant: req.params.userId,
        status: "accepted"
      });

    const rejected =
      await Application.countDocuments({
        applicant: req.params.userId,
        status: "rejected"
      });

    const pending =
      await Application.countDocuments({
        applicant: req.params.userId,
        status: "pending"
      });

    res.status(200).json({
      totalApplied,
      accepted,
      rejected,
      pending
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  recruiterStats,
  candidateStats
};