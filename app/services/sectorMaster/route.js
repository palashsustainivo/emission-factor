const express = require('express');
const controller = require('./index');
const upload = require("../../../middleware/upload.js");
const validate = require("../../validation/sectorMaster/index.js");
const auth = require("../../../middleware/auth.js");
const createActivityLog = require("../../../middleware/activityLog.js");

/**
 * Express router for sector_master routes.
 * @type {express.Router}
 */

module.exports = express.Router()
  .get("/sector_master/:id", auth, createActivityLog, controller.getDataById)
  .post("/sector_master", auth, validate.createData, createActivityLog, controller.createData)
  .post("/sector_master/filter_serarch", auth, validate.filterSearch, createActivityLog, controller.filterSearch)
  .put("/sector_master/:id", auth, validate.updateData, createActivityLog, controller.updateData)
  .delete("/sector_master/:id", auth, createActivityLog, controller.deleteData)
  .delete("/sector_master/delete/multi", auth, validate.deleteMultipleData, createActivityLog, controller.multiDeleteData)
  .post("/sector_master/soft/delete", auth, validate.softDeleteMultipleData, createActivityLog, controller.multiSoftDeleteData)
  .post("/sector_master/bulkUpload", auth, upload.single("file"), validate.bulkUploadData, createActivityLog, controller.bulkUploadData)
  .get("/sector_master", auth, validate.listData, createActivityLog, controller.getAllData);
