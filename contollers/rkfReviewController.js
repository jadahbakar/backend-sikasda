var db = require("../db/db");
var asyncro = require("../middleware/asyncro");

const getRKFReview = asyncro.asyncHandler(async (request, response, next) => {
  let unitKerjaId = request.query.unitKerjaId;
  let rkfSupport = await db.any(
    "SELECT * FROM mst.get_rkf_from(${unitKerjaId}) ",
    {
      unitKerjaId
    }
  );

  response.json(rkfSupport[0]);
});

module.exports = {
  getRKFReview: getRKFReview
};
