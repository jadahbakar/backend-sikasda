var express = require("express");
var router = express.Router();

var Login = require("../contollers/loginController");

router.post("/", Login.postLogin);
// router.get("/:username", Login.getLoginSDM);

module.exports = router;
