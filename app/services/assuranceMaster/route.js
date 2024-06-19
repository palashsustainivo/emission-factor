const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/assuranceMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for assurance_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/assurance_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/assurance_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/assurance_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/assurance_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/assurance_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/assurance_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/assurance_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/assurance_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/assurance_master", auth, validate.listData, createActivityLog, controller.getAllData);
