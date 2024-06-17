const express = require('express');
const controller = require('./index');
const validate = require("../../validation/activityLog/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for activity_log routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .post("/activity_log/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch);
