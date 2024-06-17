const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/groupMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for group_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/group_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/group_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/group_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/group_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/group_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/group_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/group_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/group_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/group_master", auth, validate.listData, createActivityLog, controller.getAllData);
