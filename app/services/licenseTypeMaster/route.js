const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/licenseTypeMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for license_type_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/license_type_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/license_type_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/license_type_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/license_type_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/license_type_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/license_type_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/license_type_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/license_type_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/license_type_master", auth, validate.listData, createActivityLog, controller.getAllData);
