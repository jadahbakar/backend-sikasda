var express = require("express");
var router = express.Router();

var rolesController = require("../contollers/rolesController");

var middleware = require("../middleware/middleware");
// var middleware = require("../middlewares");
// router.get("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.get("/", rolesController.getAllRoles);
router.get("/menus", rolesController.getMenuAuth);
// router.get(("/menus/:id", rolesController.getMenuAuth);

router.post("/", rolesController.postRoles);
router.post("/menus", rolesController.postMenu);

// router.post("/roles", rolesController.postRoles);

module.exports = router;
