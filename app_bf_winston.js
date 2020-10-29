var createError = require("http-errors");
var express = require("express");
var compression = require("compression");
require("dotenv").config();
const rateLimit = require("express-rate-limit"); //limit
var RedisStore = require("rate-limit-redis");
const helmet = require("helmet"); //for security

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();
app.use(compression());
app.use(cors());

app.set("views", path.join(__dirname, "views")); // view engine setup
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable("etag"); //disable eTag display on header. This will disable etag header for all requests
app.disable("Last-Modified");

//disable eTag for static content
app.use(
  express.static(path.join(__dirname, "public"), {
    etag: false
  })
);

// for Security Reason we use
app.use(helmet());
app.use(helmet.expectCt());
app.use(helmet.noCache());
app.use(helmet.referrerPolicy());

// limit
// https://www.npmjs.com/package/express-rate-limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  statusCode: 429,
  headers: false,
  store: new RedisStore({
    // see Configuration https://github.com/wyattjoh/rate-limit-redis#readme
    expiry: 60
  })
});

app.use((req, res, next) => {
  //middleware -> so it run before anything
  // console.log("start here");
  // res.removeHeader("X-XSS-Protection");
  // res.removeHeader("Access-Control-Allow-Origin");
  res.removeHeader("Cache-Control");
  res.removeHeader("Connection");
  res.removeHeader("Expect-CT");
  res.removeHeader("Expires");
  res.removeHeader("Pragma");
  res.removeHeader("Referrer-Policy");
  res.removeHeader("Strict-Transport-Security");
  res.removeHeader("Surrogate-Control");
  res.removeHeader("X-DNS-Prefetch-Control");
  res.removeHeader("X-Download-Options");
  res.removeHeader("X-Frame-Options");
  res.removeHeader("X-RateLimit-Limit");
  res.removeHeader("X-RateLimit-Remaining");
  res.removeHeader("X-RateLimit-Reset");
  res.removeHeader("X-XSS-Protection");
  next();
});

// Router
var indexRouter = require("./routes/indexRoutes");
var loginRouter = require("./routes/loginRoutes");
var usersRouter = require("./routes/usersRoutes");
var rolesRouter = require("./routes/rolesRoutes");
var masterRouter = require("./routes/masterRoutes");
var testRouter = require("./routes/testRoutes");

// Main Router -> Pertama Kali melihat dunia
app.use("/", limiter, indexRouter);
// app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/master", masterRouter);
app.use("/test", testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  // res.status(500).send({ error: "Internal server error happened" });
});

module.exports = app;
