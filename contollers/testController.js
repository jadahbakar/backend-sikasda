var db = require("../db/db");
var asyncro = require("../middleware/asyncro");

function getTest(req, res, nex) {
  res.status(200).json({
    success: true,
    message: "masuk pak eko"
  });
}

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// const getVisiMisi = () => {
async function getAsync5(request, response, next) {
  const AllVisiMisi = await db.task(t => {
    return t.any("SELECT visi_id, visi_nama FROM mst.visi").then(allVisi => {
      return t.any("SELECT misi_id, misi_nama FROM mst.misi").then(allMisi => {
        response.json({ allVisi, allMisi });
      });
      return { allVisi };
    });
  });
}

const getAsync = asyncro.asyncHandler(async (req, res, next) => {
  let visi = await db.any("SELECT visi_id, visi_nama FROM mst.visi");
  let misi = await db.any("SELECT misi_id, misi_nama FROM mst.misi");
  res.json({ visi, misi });
});

module.exports = {
  getTest: getTest,
  getAsync: getAsync
};
