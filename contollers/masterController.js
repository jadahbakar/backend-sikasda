var db = require("../db/db");
var asyncro = require("../middleware/asyncro");

const getAllMaster = asyncro.asyncHandler(async (request, response, next) => {
  const yearNow = new Date().getFullYear() + 1;
  console.log(yearNow);
  let allJabatan = await db.any(
    "SELECT jabatan_id, jabatan_nama FROM mst.jabatan"
  );
  let allVisi = await db.any("SELECT visi_id, visi_nama FROM mst.visi");
  let allMisi = await db.any("SELECT misi_id, misi_nama FROM mst.misi");
  let allCorePlan = await db.any(
    "SELECT cp_id, cp_kode, cp_nama FROM mst.coreplan"
  );
  let allKUD = await db.any(
    "SELECT kud_id, kud_nama FROM mst.kud WHERE kud_tahun = ${yearNow} ORDER BY kud_id",
    { yearNow }
  );
  let allStsProker = await db.any(
    "SELECT sts_proker_id, sts_proker_nama FROM mst.status_proker WHERE sts_proker_sts = 1"
  );
  let allKatProker = await db.any(
    "SELECT kat_proker_id, kat_proker_nama FROM mst.kategori_proker WHERE kat_proker_sts = 1"
  );
  let allSkalaProker = await db.any(
    "SELECT skala_proker_id, skala_proker_nama FROM mst.skala_proker WHERE skala_proker_sts = 1"
  );
  let allBSC = await db.any(
    "SELECT bsc_id, bsc_nama FROM mst.bsc WHERE bsc_sts = 1"
  );
  let allTLAudit = await db.any(
    "SELECT tindak_lanjut_id, tindak_lanjut_nama FROM mst.tindak_lanjut WHERE tindak_lanjut_sts = 1"
  );
  let allSatuan = await db.any(
    "SELECT satuan_id, satuan_nama FROM mst.satuan WHERE satuan_sts = 1"
  );
  // let allUnitKerja = await db.any(
  //   "SELECT uker_id, uker_nama FROM mst.unitkerja WHERE uker_sts = 1 AND uker_kategori= 'new'"
  // );
  let allPosBiaya = await db.any(
    "SELECT posbiaya_id, posbiaya_nama FROM mst.posbiaya WHERE posbiaya_sts = 1"
  );
  let allDivisi = await db.any("SELECT mst.divisi()");
  let divisi = allDivisi[0].divisi;

  response.json({
    allJabatan,
    allVisi,
    allMisi,
    allCorePlan,
    allKUD,
    allStsProker,
    allKatProker,
    allSkalaProker,
    allBSC,
    allTLAudit,
    allSatuan,
    // allUnitKerja,
    allPosBiaya,
    divisi
  });
});

const getVisiMisi = asyncro.asyncHandler(async (request, response, next) => {
  let allVisi = await db.any("SELECT visi_id, visi_nama FROM mst.visi");
  let allMisi = await db.any("SELECT misi_id, misi_nama FROM mst.misi");
  response.json({ allVisi, allMisi });
});

const getCPKUD = asyncro.asyncHandler(async (request, response, next) => {
  const yearNow = new Date().getFullYear() + 1;
  let allCorePlan = await db.any(
    "SELECT cp_id, cp_kode, cp_nama FROM mst.coreplan"
  );
  let allKUD = await db.any(
    "SELECT kud_id, kud_nama FROM mst.kud WHERE kud_tahun = ${yearNow}",
    { yearNow }
  );
  response.json({ allCorePlan, allKUD });
});

const getStsProKer = asyncro.asyncHandler(async (request, response, next) => {
  let allStsProker = await db.any(
    "SELECT sts_proker_id, sts_proker_nama FROM mst.status_proker WHERE sts_proker_sts = 1"
  );
  response.json({ allStsProker });
});

const getSkalaProKer = asyncro.asyncHandler(async (request, response, next) => {
  let allSkalaProker = await db.any(
    "SELECT skala_proker_id, skala_proker_nama FROM mst.skala_proker WHERE skala_proker_sts = 1"
  );

  response.json(allSkalaProker);
});

const getBSC = asyncro.asyncHandler(async (request, response, next) => {
  let allBSC = await db.any(
    "SELECT bsc_id, bsc_nama FROM mst.bsc WHERE bsc_sts = 1"
  );
  response.json(allBSC);
});

const getTL = asyncro.asyncHandler(async (request, response, next) => {
  let allTL = await db.any(
    "SELECT tindak_lanjut_id, tindak_lanjut_nama FROM mst.tindak_lanjut WHERE tindak_lanjut_sts = 1"
  );
  response.json(allTL);
});

const getKategoriProKer = asyncro.asyncHandler(
  async (request, respon, next) => {
    let allKatProker = await db.any(
      "SELECT kat_proker_id, kat_proker_nama FROM mst.kategori_proker WHERE kat_proker_sts = 1"
    );
    respon.json(allKatProker);
  }
);

const getUnitKerja = asyncro.asyncHandler(async (request, response, next) => {
  // const { unitKerja, jabatanId } = request.body;
  // console.log(request.query.unitKerjaId);
  // console.log(request.query.jabatanId);
  let unitKerjaId = request.query.unitKerjaId;
  let jabatanId = request.query.jabatanId;
  // console.log(request.body);
  let unitKerja = await db.any(
    "SELECT mst.jabatan_per_unitkerja(${unitKerjaId},${jabatanId})",
    { unitKerjaId, jabatanId }
  );
  // karena menggunakan Function di PostgreSQL
  response.json(unitKerja[0].jabatan_per_unitkerja);
});

const getPegawaiUnitKerja = asyncro.asyncHandler(
  async (request, response, next) => {
    let unitKerjaId = request.query.unitKerjaId;
    let jabatanId = request.query.jabatanId;
    let unitKerja = await db.any(
      "SELECT mst.pegawai_per_unitkerja(${unitKerjaId},${jabatanId})",
      { unitKerjaId, jabatanId }
    );
    // karena menggunakan Function di PostgreSQL
    response.json(unitKerja[0].pegawai_per_unitkerja);
  }
);

const getPegawaiDivisi = asyncro.asyncHandler(
  async (request, response, next) => {
    let unitKerjaId = request.query.unitKerjaId;
    let pegawaiDivisi = await db.any(
      "SELECT mst.pegawai_per_divisi(${unitKerjaId})",
      { unitKerjaId }
    );
    // karena menggunakan Function di PostgreSQL
    response.json(pegawaiDivisi[0].pegawai_per_divisi);
  }
);

module.exports = {
  getAllMaster: getAllMaster,
  getVisiMisi: getVisiMisi,
  getCPKUD: getCPKUD,
  getStsProKer: getStsProKer,
  getKategoriProKer: getKategoriProKer,
  getSkalaProKer: getSkalaProKer,
  getBSC: getBSC,
  getTL: getTL,
  getUnitKerja: getUnitKerja,
  getPegawaiUnitKerja: getPegawaiUnitKerja,
  getPegawaiDivisi: getPegawaiDivisi
};
