var db = require("../db/db");
var asyncro = require("../middleware/asyncro");

const postRKF = asyncro.asyncHandler(async (request, response, next) => {
  // const stringify = JSON.stringify(request.body.unitPelaksana);

  // // berhasil 1
  // let input = await db.none(
  //   "INSERT INTO mst.rkf (rkf_unit_pelaksana) VALUES ($1::jsonb)",
  //   // request.body.unitPelaksana
  //   stringify
  // );

  // berhasil 2
  // let input = await db.none(
  //   "INSERT INTO mst.rkf (rkf_unit_pelaksana) VALUES ($1)",
  //   // request.body.unitPelaksana
  //   stringify
  // );

  // berhasil 3
  // const unitPelaksana = JSON.stringify(request.body.unitPelaksana);
  // let input = await db.none(
  //   "INSERT INTO mst.rkf (rkf_unit_pelaksana) VALUES (${unitPelaksana})",
  //   // request.body.unitPelaksana
  //   { unitPelaksana }
  // );
  // console.log("masuk pak eko");
  // console.log(request.body.selectedVisi);
  // console.log(request.body.selectedBulan);

  // darisini----------
  const {
    rkfUser,
    rkfUserFrom,
    rkfTahun,
    rkfJenisId,
    selectedVisi,
    selectedMisi,
    selectedCorePlan,
    // selectedKUD,
    kudArr,
    proker,
    stsProker,
    skalaProker,
    katProker,
    bsc,
    // tlAudit,
    // tahunAudit,
    tindakLanjutAudit,
    konsultan,
    tujuanProkerArr,
    indikatorKeberhasilanArr,
    targetFinansial,
    selectedBulan,
    anggaran,
    unitPelaksana,
    fungsiLain
  } = request.body;
  // console.log(selectedBulan);

  // define let for jsonb field
  const unitPel = JSON.stringify(unitPelaksana);
  const visi = JSON.stringify(selectedVisi);
  const misi = JSON.stringify(selectedMisi);
  const cp = JSON.stringify(selectedCorePlan);
  // const kud = JSON.stringify(selectedKUD);
  const kud = JSON.stringify(kudArr);
  const tlAudit = JSON.stringify(tindakLanjutAudit);
  const tujuanProker = JSON.stringify(tujuanProkerArr);
  const indikatorKeberhasilan = JSON.stringify(indikatorKeberhasilanArr);
  const targetFin = JSON.stringify(targetFinansial);
  const jadwalPelaksanaan = JSON.stringify(selectedBulan.sort());
  const anggaranArr = JSON.stringify(anggaran);
  const fungsiLainArr = JSON.stringify(fungsiLain);

  // rkf_audit, rkf_audit_tahun, rkf_konsultan, \
  // ${ tlAudit }, ${ tahunAudit }, ${ konsultan }, \

  let input = await db.none(
    "INSERT INTO mst.rkf (\
      rkf_user, rkf_user_from, rkf_tahun, rkf_jenis_id, \
      rkf_unit_pelaksana, \
      rkf_visi, rkf_misi, rkf_coreplan, rkf_kud, \
      rkf_proker, \
      rkf_status_proker, rkf_skala_proker, rkf_kat_proker, rkf_bsc, \
      rkf_tlaudit, rkf_konsultan, \
      rkf_tujuan_proker, rkf_indikator, \
      rkf_targetfin, \
      rkf_jadwal, \
      rkf_anggaran, \
      rkf_fungsilain \
      ) VALUES ( \
      ${rkfUser}, ${rkfUserFrom}, ${rkfTahun}, ${rkfJenisId}, \
      ${unitPel}, \
      ${visi},  ${misi},  ${cp},  ${kud}, \
      ${proker}, \
      ${stsProker}, ${skalaProker}, ${katProker}, ${bsc}, \
      ${tlAudit}, ${konsultan}, \
      ${tujuanProker}, ${indikatorKeberhasilan}, \
      ${targetFin}, \
      ${jadwalPelaksanaan}, \
      ${anggaranArr}, \
      ${fungsiLainArr} \
      )",
    {
      rkfUser,
      rkfUserFrom,
      rkfTahun,
      rkfJenisId,
      unitPel,
      visi,
      misi,
      cp,
      kud,
      proker,
      stsProker,
      skalaProker,
      katProker,
      bsc,
      tlAudit,
      // tlAudit,
      // tahunAudit,
      konsultan,
      tujuanProker,
      indikatorKeberhasilan,
      targetFin,
      jadwalPelaksanaan,
      anggaranArr,
      fungsiLainArr
    }
  );
  response.json("pass");
});

const updateRKF = asyncro.asyncHandler(async (request, response, next) => {
  // darisini----------
  const {
    rkfUser,
    rkfUserFrom,
    rkfTahun,
    rkfJenisId,
    selectedVisi,
    selectedMisi,
    selectedCorePlan,
    // selectedKUD,
    kudArr,
    proker,
    stsProker,
    skalaProker,
    katProker,
    bsc,
    // tlAudit,
    // tahunAudit,
    tindakLanjutAudit,
    konsultan,
    tujuanProkerArr,
    indikatorKeberhasilanArr,
    targetFinansial,
    selectedBulan,
    anggaran,
    unitPelaksana,
    fungsiLain,
    rkfId
  } = request.body;

  // define let for jsonb field
  const unitPel = JSON.stringify(unitPelaksana);
  const visi = JSON.stringify(selectedVisi);
  const misi = JSON.stringify(selectedMisi);
  const cp = JSON.stringify(selectedCorePlan);
  // const kud = JSON.stringify(selectedKUD);
  const kud = JSON.stringify(kudArr);
  const tlAudit = JSON.stringify(tindakLanjutAudit);
  const tujuanProker = JSON.stringify(tujuanProkerArr);
  const indikatorKeberhasilan = JSON.stringify(indikatorKeberhasilanArr);
  const targetFin = JSON.stringify(targetFinansial);
  const jadwalPelaksanaan = JSON.stringify(selectedBulan);
  const anggaranArr = JSON.stringify(anggaran);
  const fungsiLainArr = JSON.stringify(fungsiLain);
  // rkf_audit= ${tlAudit}, rkf_audit_tahun= ${tahunAudit}, rkf_konsultan= ${konsultan}, \

  // console.log(unitPelaksana);
  // console.log(unitPel);

  let update = await db.none(
    "UPDATE mst.rkf \
      SET rkf_visi= ${visi}, rkf_misi= ${misi}, rkf_coreplan= ${cp}, rkf_kud= ${kud},  \
      rkf_proker= ${proker}, \
      rkf_status_proker= ${stsProker}, rkf_skala_proker= ${skalaProker}, rkf_kat_proker= ${katProker}, rkf_bsc= ${bsc}, \
      rkf_tlaudit= ${tlAudit}, rkf_konsultan= ${konsultan}, \
      rkf_unit_pelaksana= ${unitPel}, \
      rkf_tujuan_proker= ${tujuanProker}, rkf_indikator= ${indikatorKeberhasilan}, \
      rkf_targetfin= ${targetFin}, \
      rkf_jadwal= ${jadwalPelaksanaan}, \
      rkf_anggaran= ${anggaranArr}, \
      rkf_fungsilain= ${fungsiLainArr} \
      WHERE rkf_id= ${rkfId} ",
    {
      rkfUser,
      rkfUserFrom,
      rkfTahun,
      rkfJenisId,
      unitPel,
      visi,
      misi,
      cp,
      kud,
      proker,
      stsProker,
      skalaProker,
      katProker,
      bsc,
      // tlAudit,
      // tahunAudit,
      tlAudit,
      konsultan,
      tujuanProker,
      indikatorKeberhasilan,
      targetFin,
      jadwalPelaksanaan,
      anggaranArr,
      fungsiLainArr,
      rkfId
    }
  );
  response.json("pass");
});

const getRKF = asyncro.asyncHandler(async (request, response, next) => {
  // INNER JOIN mst.tindak_lanjut ON rkf_audit = tindak_lanjut_id \
  let unitKerjaId = request.query.unitKerjaId;
  console.log(unitKerjaId);
  let rkfdata = await db.any(
    "SELECT rkf_id, rkf_sts, rkf_proker, skala_proker_nama, kat_proker_nama, \
      array_to_string(array(SELECT mst.bulan(jsonb_array_elements_text(rkf_jadwal))), ', ') \
      AS rkf_jadwal \
      FROM mst.rkf r \
      INNER JOIN mst.rkf_jenis j ON r.rkf_jenis_id = j.rkf_jenis_id \
      INNER JOIN mst.skala_proker ON rkf_skala_proker = skala_proker_id \
      INNER JOIN mst.kategori_proker ON rkf_kat_proker = kat_proker_id \
      WHERE rkf_user_from = ${unitKerjaId} ORDER BY rkf_id",
    { unitKerjaId }
  );
  // karena menggunakan Function di PostgreSQL
  response.json(rkfdata);
});

const getRKFDetail = asyncro.asyncHandler(async (request, response, next) => {
  // rkf_audit, rkf_audit_tahun, rkf_konsultan, rkf_unit_pelaksana, rkf_visi, \
  let rkfId = request.query.rkfId;
  let rkfDetail = await db.any(
    "SELECT rkf_sts, rkf_id, rkf_user, rkf_user_from, rkf_tahun, rkf_jenis_id, \
      rkf_proker, rkf_status_proker, rkf_skala_proker, rkf_kat_proker, rkf_bsc, \
      rkf_tlaudit, rkf_konsultan, rkf_unit_pelaksana, rkf_visi, \
      rkf_misi, rkf_coreplan, rkf_kud, rkf_tujuan_proker, rkf_indikator, \
      rkf_targetfin, rkf_jadwal, rkf_anggaran, rkf_fungsilain, rkf_time_input, \
      rkf_note_otor \
      FROM mst.rkf \
      WHERE rkf_id = ${rkfId}",
    { rkfId }
  );
  response.json(rkfDetail);
});

const postOtoRKF = asyncro.asyncHandler(async (request, response, next) => {
  let rkfId = request.body.rkfId;
  let rkfOtorUser = request.body.rkfOtorUser;
  let rkfNewStatus = request.body.rkfNewStatus;
  let rkfCatatanReview = request.body.rkfCatatanReview;

  // console.log(request.body.rkfId);
  // console.log(request.body.rkfOtorUser);
  // console.log(request.body.rkfNewStatus);
  // console.log(request.body.rkfCatatanReview);

  let otor = await db.none(
    "UPDATE mst.rkf SET \
      rkf_sts = ${rkfNewStatus}, \
      rkf_otor = ${rkfOtorUser}, \
      rkf_note_otor = ${rkfCatatanReview}, \
      rkf_time_otor = now() \
      WHERE rkf_id = ${rkfId}",
    { rkfNewStatus, rkfOtorUser, rkfCatatanReview, rkfId }
  );
  response.json("pass");
});

module.exports = {
  postRKF: postRKF,
  getRKF: getRKF,
  updateRKF: updateRKF,
  postOtoRKF: postOtoRKF,
  getRKFDetail: getRKFDetail
};
