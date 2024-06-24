const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/conversionMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for conversion_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/conversion_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/conversion_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/conversion_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/conversion_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/conversion_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/conversion_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/conversion_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/conversion_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/conversion_master", auth, validate.listData, createActivityLog, controller.getAllData);
