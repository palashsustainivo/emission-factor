const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/sourceMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for source_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/source_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/source_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/source_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/source_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/source_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/source_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/source_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/source_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/source_master", auth, validate.listData, createActivityLog, controller.getAllData);
