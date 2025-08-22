const express = require("express");
const router = express.Router();

const {addSchool} = require("../controllers/schoolController");

router.route("/addSchool").post(addSchool);

// router.route("/listSchools").get();

module.exports = router;
