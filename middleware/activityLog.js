import dbCrud from '../app/models/activityLog/index';
// import model from '../app/models/activityLog/model.js';

async function createActivityLog(req,res,next) {
  try {
    let refId = ""; 
    let originalUrl = req.originalUrl.split("/");
    const tableName = originalUrl[2].split("?")[0];

    if((req.method == process.env.GET_METHOD || req.method == process.env.DELETE_METHOD) && typeof originalUrl[3] != "undefined" && originalUrl[3] != "" && Object.keys(req.body).length == 0) {
      refId = originalUrl[3];
    }
    if((req.method == process.env.GET_METHOD) && typeof originalUrl[3] != "undefined" && originalUrl[3] == "child" && Object.keys(req.body).length == 0) {
      refId = "";
    }
    if(req.method == process.env.PUT_METHOD && typeof originalUrl[3] != "undefined" && originalUrl[3] != "" && Object.keys(req.body).length != 0) {
      refId = originalUrl[3];
    }
    let insertData = {
      table_name: tableName ? tableName : "",
      ref_id: refId,
      action_type: req.method ? req.method : process.env.GET_METHOD,
      created_by: req.userId,
      action_details: req.body ? req.body : "",
    };
    if(req.method == process.env.GET_METHOD && refId == "" && originalUrl[3] == "child") {
      insertData.action_for = 'parentChildDetails';
    } else if(req.method == process.env.GET_METHOD && refId == "") {
      insertData.action_for = 'list';
    } else if(req.method == process.env.GET_METHOD && refId != "") {
      insertData.action_for = 'getById';
    } else if(req.method == process.env.POST_METHOD && Object.keys(req.body).length != 0) {
      insertData.action_for = 'create';
    } else if(req.method == process.env.PUT_METHOD && typeof originalUrl[3] != "undefined" && Object.keys(req.body).length != 0) {
      insertData.action_for = 'update';
    } else if(req.method == process.env.POST_METHOD && originalUrl[3] == "filter_serarch") {
      insertData.action_for = 'filterSerarch';
    } else if(req.method == process.env.POST_METHOD && originalUrl[3] == "soft" && originalUrl[4] == "delete") {
      insertData.action_for = 'softDelete';
    } else if(req.method == process.env.POST_METHOD && originalUrl[3] == "bulkUpload") {
      insertData.action_for = 'bulkUpload';
    } else if(req.method == process.env.DELETE_METHOD && Object.keys(req.body).length == 0) {
      insertData.action_for = 'delete';
    } else if(req.method == process.env.DELETE_METHOD && Object.keys(req.body).length != 0) {
      insertData.action_for = 'multiDelete';
    }
    const result = await dbCrud.create(insertData);
    next();
  } catch (error) {
    return res.status(process.env.ERROR_BAD_REQUEST_CODE).json({ message: process.env.ACTIVITY_LOG_MESSAGE });
  }
}

module.exports = createActivityLog;