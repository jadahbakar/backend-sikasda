var express = require("express");
var router = express.Router();

var rkfController = require("../contollers/rkfController");
// var middleware = require("../middleware/middleware");
// var middleware = require("../middlewares");
// router.get("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.post("/", rkfController.postRKF);
router.post("/update", rkfController.updateRKF);
router.post("/otorkf", rkfController.postOtoRKF);
router.get("/", rkfController.getRKF);
router.get("/rkfdetail", rkfController.getRKFDetail);

module.exports = router;
