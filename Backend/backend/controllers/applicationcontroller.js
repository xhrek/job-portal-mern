const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    const { jobId, applicantId } = req.body;

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: applicantId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied"
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: applicantId
    });

    res.status(201).json({
      message: "Applied successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate("applicant", "name email")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//Get my Applications
const getMyApplications = async (req, res) => {
  try {
    console.log("PARAMS:", req.params);

    const applications = await Application.find({
      applicant: req.params.userId
    }).populate("job");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//Delete applicattion
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json({
      message: "Application deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//Update Application
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  applyJob,
  getApplicationsByJob,
  getMyApplications,
  deleteApplication,
  updateApplicationStatus
};