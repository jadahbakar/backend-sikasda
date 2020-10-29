var express = require("express");
var router = express.Router();

var userController = require("../contollers/userController");

var middleware = require("../middleware/middleware");
// var middleware = require("../middlewares");
// router.get("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.get("/", userController.getAllUsers);
// router.get("/field", userController.getField);
// router.get("/jumlah", userController.getJumlah);
// router.get("/:id", users.getOneUsers);

module.exports = router;
