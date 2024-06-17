const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/methodologyMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for methodology_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/methodology_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/methodology_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/methodology_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/methodology_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/methodology_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/methodology_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/methodology_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/methodology_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/methodology_master", auth, validate.listData, createActivityLog, controller.getAllData);
