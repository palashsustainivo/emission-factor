const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/regionMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for region_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/region_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/region_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/region_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/region_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/region_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/region_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/region_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/region_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/region_master", auth, validate.listData, createActivityLog, controller.getAllData);
