var jwt = require("jsonwebtoken");
var _ = require("lodash");

function createJWToken(details) {
  if (typeof details !== "object") {
    details = {};
  }

  if (!details.maxAge || typeof details.maxAge !== "number") {
    details.maxAge = process.env.MAX_AGE;
  }

  details.sessionData = _.reduce(
    details.sessionData || {},
    (memo, val, key) => {
      if (typeof val !== "function" && key !== "password") {
        memo[key] = val;
      }
      return memo;
    },
    {}
  );

  let token = jwt.sign(
    {
      data: details.sessionData
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: details.maxAge,
      algorithm: "HS256"
    }
  );

  return token;
}

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

module.exports = {
  verifyJWTToken: verifyJWTToken,
  createJWToken: createJWToken
};
