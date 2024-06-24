const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/emissionFactor/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for emission_factor routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/emission_factor/:id", auth, createActivityLog, controller.getDataById)
  .post("/emission_factor", auth, validate.createData, createActivityLog, controller.createData)
  .post("/emission_factor/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/emission_factor/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/emission_factor/:id", auth, createActivityLog, controller.deleteData)
  .delete("/emission_factor/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/emission_factor/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/emission_factor/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .post("/emission_factor/count/various_attribute", auth, validate.countByAttribute, createActivityLog, controller.efCountByAttribute)
  .get("/emission_factor", auth, validate.listData, createActivityLog, controller.getAllData);
