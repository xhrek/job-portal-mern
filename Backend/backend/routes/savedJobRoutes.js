const express = require("express");
const router = express.Router();

const {
saveJob,
getSavedJobs,
deleteSavedJob,
} = require("../controllers/savedJobController");

// Save a job
router.post("/:userId/:jobId", saveJob);

// Get saved jobs of a user
router.get("/:userId", getSavedJobs);

// Delete a saved job
router.delete("/:id", deleteSavedJob);

module.exports = router;
