const express = require("express");
const router = express.Router();

const { addSchool, getSchools } = require("../controllers/schoolController");

router.route("/addSchool").post(addSchool);

router.route("/listSchools").get(getSchools);

module.exports = router;
