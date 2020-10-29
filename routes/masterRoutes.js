var express = require("express");
var router = express.Router();

var masterController = require("../contollers/masterController");

var middleware = require("../middleware/middleware");
// var middleware = require("../middlewares");
// router.get("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.get("/all", masterController.getAllMaster);
router.get("/visimisi", masterController.getVisiMisi);
router.get("/cpkud", masterController.getCPKUD);
// Program Kerja
router.get("/stsproker", masterController.getStsProKer);
router.get("/katproker", masterController.getKategoriProKer);
router.get("/skalaproker", masterController.getSkalaProKer);

router.get("/bsc", masterController.getBSC);
router.get("/tl", masterController.getTL);
router.get("/unitkerja", masterController.getUnitKerja);
router.get("/pegawaiunitkerja", masterController.getPegawaiUnitKerja);
router.get("/pegawaidivisi", masterController.getPegawaiDivisi);

module.exports = router;
