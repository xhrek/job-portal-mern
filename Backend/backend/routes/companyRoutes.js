const express = require("express");
const router = express.Router();

const {
createCompany,
getCompanies,
getCompanyById,
updateCompany,
deleteCompany,
} = require("../controllers/companyController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getCompanies);
router.get("/:id", getCompanyById);

// Recruiter/Admin Routes
router.post(
"/",
authMiddleware,
roleMiddleware("recruiter", "admin"),
createCompany
);

router.put(
"/:id",
authMiddleware,
roleMiddleware("recruiter", "admin"),
updateCompany
);

router.delete(
"/:id",
authMiddleware,
roleMiddleware("recruiter", "admin"),
deleteCompany
);

module.exports = router;
