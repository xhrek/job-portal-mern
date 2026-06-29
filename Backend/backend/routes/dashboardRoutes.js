const express = require("express");
const router = express.Router();

const {
  recruiterStats,
  candidateStats
} = require("../controllers/dashboardController");

router.get("/recruiter/:recruiterId",recruiterStats);
router.get("/candidate/:userId",candidateStats);
module.exports = router;
