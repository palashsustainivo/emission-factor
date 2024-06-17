const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/calculationOriginMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for calculation_origin_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/calculation_origin_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/calculation_origin_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/calculation_origin_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/calculation_origin_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/calculation_origin_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/calculation_origin_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/calculation_origin_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/calculation_origin_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/calculation_origin_master", auth, validate.listData, createActivityLog, controller.getAllData);
