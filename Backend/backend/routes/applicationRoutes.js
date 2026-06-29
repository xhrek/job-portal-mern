const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


const {
  applyJob,
  getApplicationsByJob,
  getMyApplications,
  deleteApplication,
  updateApplicationStatus
} = require("../controllers/applicationController");

// Apply for a job
router.post("/apply", applyJob);

// Get all applications for a specific job
router.get("/job/:jobId", getApplicationsByJob);

// Get all applications of a specific user
router.get("/user/:userId", getMyApplications);

// Delete an application
router.delete("/:id", deleteApplication);

//update application status
router.put("/:id/status", updateApplicationStatus);

//apply for a job
router.post("/apply", authMiddleware,roleMiddleware("candidate"),applyJob);

//view applications
router.get("/job/:jobId", authMiddleware,roleMiddleware("recruiter","admin"),getApplicationsByJob);

module.exports = router;