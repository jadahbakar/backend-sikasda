var express = require("express");
var router = express.Router();

var rkfController = require("../contollers/rkfReviewController");

router.get("/summary", rkfController.getRKFReview);

module.exports = router;
