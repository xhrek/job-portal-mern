const express = require("express");
const router = express.Router();

const {
createJob,
getJobs,
getJobById,
updateJob,
deleteJob,
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Recruiter Only Routes
router.post(
"/",
authMiddleware,
roleMiddleware("recruiter", "admin"),
createJob
);

router.put(
"/:id",
authMiddleware,
roleMiddleware("recruiter", "admin"),
updateJob
);

router.delete(
"/:id",
authMiddleware,
roleMiddleware("recruiter", "admin"),
deleteJob
);

module.exports = router;
