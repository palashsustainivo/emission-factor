const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/categoryMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for category_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/category_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/category_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/category_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/category_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/category_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/category_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/category_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/category_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/category_master", auth, validate.listData, createActivityLog, controller.getAllData);
