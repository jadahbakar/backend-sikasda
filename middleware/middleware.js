// File ini dibutuhkan oleh ./auth dan digunakan oleh proses Authentikasi

var auth = require("../auth/authentication");

function verifyJWT_MW(req, res, next) {
  // var token = req.method === "POST" ? req.body.token : req.query.token;
  var token = req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request
  auth
    .verifyJWTToken(token)
    .then(decodedToken => {
      req.user = decodedToken.data;
      // console.log(decodedToken);
      next();
    })
    .catch(err => {
      res.status(400).json({ message: "Invalid auth token provided." });
    });
}

module.exports = {
  verifyJWT_MW
};
