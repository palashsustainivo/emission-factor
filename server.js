var createError = require("http-errors");
var express = require("express");
const helmet = require('helmet');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
const rateLimit = require("express-rate-limit");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
var logger = require("morgan");
const cors = require('cors');

//import db from "./config/database.js"
//import activityLog from "./app/models/activityLog/model.js";

var indexRouter = require("./app/routes/index");
// var indexRouter = require("./app/services/userMaster/route");

const app = express();

app.disable('x-powered-by');

global.__basedir = __dirname + "";

// view engine setup
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors()); // This will allow CORS for all origins

app.use(helmet());
//app.use(csrfProtection);

// Body-parser middleware
app.use(
  bodyParser.json({
      limit: "50mb",
  })
);

// for parsing application/xwww-form-urlencoded
app.use(
  bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", indexRouter);

app.get("/", (request, response) => {
  response.send("Hello from EMISSION FACTOR Backend!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
