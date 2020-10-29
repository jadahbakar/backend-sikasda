// const { Pool } = require("pg");
// const connectionString =
//   process.env.DATABASE_URL || "postgres://posinv:posinv*@localhost:5969/posinv";
// const pool = new Pool({
//   connectionString: connectionString
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params)
// };

var promise = require("bluebird");

// Initialization Options
var initOption = {
  promiseLib: promise
};

const pgp = require("pg-promise")(initOption);
const connectionString = {
  // host: "localhost",
  // port: 5969,
  // database: "planning",
  // user: "bjtg",
  // password: "bjtg*123"
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const db = pgp(connectionString);

//  module.exports = {
//   query: (text, params) => db.query(text, params)
// };
module.exports = db;
