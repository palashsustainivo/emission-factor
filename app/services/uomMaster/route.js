const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/uomMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for uom_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/uom_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/uom_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/uom_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/uom_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/uom_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/uom_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/uom_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/uom_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/uom_master", auth, validate.listData, createActivityLog, controller.getAllData);
