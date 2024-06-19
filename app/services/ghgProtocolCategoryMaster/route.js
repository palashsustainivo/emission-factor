const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/ghgProtocolCategoryMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for ghg_protocol_category_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/ghg_protocol_category_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/ghg_protocol_category_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/ghg_protocol_category_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/ghg_protocol_category_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/ghg_protocol_category_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/ghg_protocol_category_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/ghg_protocol_category_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/ghg_protocol_category_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/ghg_protocol_category_master", auth, validate.listData, createActivityLog, controller.getAllData);
