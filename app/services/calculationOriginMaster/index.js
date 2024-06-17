
import dbCrud from '../../models/calculationOriginMaster/index';
import readExcel from '../../common/readExcel';
import { Op } from 'sequelize';
const log = require('node-file-logger');
import sanitizeHtml from 'sanitize-html';
const primaryKey = "calculation_origin_id";

/**
 * Get all calculation origin master records
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getAllData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    let start = sanitizeHtml(req.query.start) ? req.query.start : process.env.DEFAULT_STAERT;
    let limit = sanitizeHtml(req.query.limit) ? req.query.limit : process.env.DEFAULT_LIMIT;
    const page = sanitizeHtml(req.query.page) ? req.query.page : process.env.DEFAULT_PAGE;
    if(page != "" && page != undefined && page != null) {
      start = (page - 1) * limit;
    }
    let serachParam = {
      is_deleted: process.env.IS_DELETED_NO,
    };
    const result = await dbCrud.getAll(serachParam,parseInt(start),parseInt(limit));
    const totalCount = await dbCrud.getAllCount(serachParam);//get total count while listing all data
    let sendResponse = {
      data: result,
      totalCount: totalCount
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
};

/**
 * Get a single calculation origin master record by ID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getDataById = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    const id = sanitizeHtml(req.params.id);
    let searchParam = {
      [primaryKey]: id,
      is_deleted: process.env.IS_DELETED_NO
    };
    const result = await dbCrud.getById(searchParam);
    let sendResponse = {
      data: result,
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}

/**
 * Get all data by searching parameter records
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const filterSearch = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    let start = sanitizeHtml(req.body.start) ? req.body.start : process.env.DEFAULT_STAERT;
    let limit = sanitizeHtml(req.body.limit) ? req.body.limit : process.env.DEFAULT_LIMIT;
    const page = sanitizeHtml(req.body.page) ? req.body.page : process.env.DEFAULT_PAGE;
    if(page != "" && page != undefined && page != null) {
      start = (page - 1) * limit;
    }

    let serachParam = req.body;
    // Sanitize each field in serachParam here...
    for (let key in serachParam) {
      if (serachParam.hasOwnProperty(key)) {
        //serachParam[key] = sanitizeHtml(serachParam[key]);
        serachParam[key] = {
          [Op.like]: "%" + serachParam[key] + "%"
        };
      }
    }
    serachParam.is_deleted = process.env.IS_DELETED_NO;
    serachParam = Object.keys(serachParam).filter(objKey =>
      (objKey !== process.env.START_KEY && objKey !== process.env.LIMIT_KEY && objKey !== process.env.PAGE_KEY)).reduce((newObj, key) =>
      {
        newObj[key] = serachParam[key];
        return newObj;
      }, {}
    );
    const result = await dbCrud.commonFilterSearch(serachParam,parseInt(start),parseInt(limit));
    const totalCount = await dbCrud.commonFilterSearchCount(serachParam);//get total count while searching data
    let sendResponse = {
      data: result,
      totalCount: totalCount
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
};

/**
 * Create a new calculation origin master record
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const createData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    let bodyData = req.body;
    // Sanitize each field in bodyData here...
    for (let key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        bodyData[key] = sanitizeHtml(bodyData[key]);
      }
    }
    bodyData.created_by = req.userId;
    const result = await dbCrud.create(bodyData);
    let sendResponse = {
      data: result,
      message: process.env.COMMON_INSERT_MESSAGE
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}


/**
 * Create multiple calculation origin master records while bulk uploading
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const bulkUploadData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    if (typeof req.file == "undefined") {
      log1.error = process.env.ERROR_UPLOAD_EXCEL_FILE_MESSAGE;
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
      let sendResponse = {
        data: [],
        message: process.env.ERROR_UPLOAD_EXCEL_FILE_MESSAGE
      };
      return res.status(process.env.ERROR_BAD_REQUEST_CODE).send(sendResponse);
    }
    let path = __basedir + process.env.UPLOAD_FOLDER + req.file.filename;
    let dbStoreData = await readExcel(path,req.userId);
    let uploadMode = req.body.upload_mode ? sanitizeHtml(req.body.upload_mode) : 0;
    if(dbStoreData) {
      if(uploadMode == 1) {
        await dbCrud.truncateTable();
      }
      dbCrud.bulkCreate(dbStoreData);
    } else {
      let sendResponse = {
        data: [],
        message: process.env.ERROR_READING_EXCEL_FILE_MESSAGE
      };
      res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
      log1.error = process.env.ERROR_READING_EXCEL_FILE_MESSAGE;
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
    }
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_UPLOAD_MESSAGE,
      modifiedRow: dbStoreData.length,
      skippedRow: 0
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}

/**
 * Update a calculation origin master record by ID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const updateData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    const id = req.params.id;
    let bodyData = req.body;
    bodyData.updated_by = req.userId;
    const result = await dbCrud.update(primaryKey,id, bodyData);
    let sendResponse = {
      data: result,
      message: process.env.COMMEON_UPDATE_MESSAGE
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}


/**
 * Delete a calculation origin master record by ID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const deleteData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    const id = req.params.id;
    const result = await dbCrud.delete(primaryKey,id);
    if(result == process.env.FOREIGN_KEY_CONSTRAINT_ERROR) {
      let sendResponse = {
        data: [],
        message: process.env.FOREIGN_KEY_CONSTRAINT_ERROR_MESSAGE
      };
      res.status(process.env.ERROR_BAD_REQUEST_CODE).send(sendResponse);
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
    } else {
      let sendResponse = {
        data: result,
        message: process.env.COMMEON_DELETE_MESSAGE
      };
      res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
      log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
    }
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}
/**
 * Delete multiple calculation origin master record by ID Array
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const multiDeleteData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    const id = req.body.id;
    const result = await dbCrud.multiDelete(primaryKey,id);
    if(result == process.env.FOREIGN_KEY_CONSTRAINT_ERROR) {
      let sendResponse = {
        data: [],
        message: process.env.FOREIGN_KEY_CONSTRAINT_ERROR_MESSAGE
      };
      res.status(process.env.ERROR_BAD_REQUEST_CODE).send(sendResponse);
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
    } else {
      let sendResponse = {
        data: result,
        message: process.env.COMMEON_DELETE_MESSAGE
      };
      res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
      log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
    }
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}

/**
 * Soft Delete multiple calculation origin master record by ID Array
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const multiSoftDeleteData = async (req, res) => {
  let log1 = {
    method: req.method || process.env.DEFAULT_METHOD_NAME,
    host: req.host || req.hostname || process.env.DEFAULT_HOST_NAME,
    port: req.port || process.env.DEFAULT_PORT_NAME,
    path: req.path || req.pathname || process.env.DEFAULT_PATH_NAME,
    headers: req.headers || {},
    params: req.params || {},
    body: req.body || {},
  }
  try {
    const id = req.body.id;
    let updateData = {
      is_deleted: process.env.IS_DELETED_YES,
      updated_by: req.userId,
    };
    const result = await dbCrud.multiSoftDelete(primaryKey, id, updateData);
    let sendResponse = {
      data: result,
      message: process.env.COMMEON_DELETE_MESSAGE
    };
    res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
    log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
  } catch (error) {
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_ERROR_MESSAGE
    };
    res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
    log1.error = error;
    log.Info(log1,process.env.ERROR_RESPONSE_LOG);
  }
}

module.exports = {
  getAllData,
  getDataById,
  filterSearch,
  createData,
  bulkUploadData,
  updateData,
  deleteData,
  multiDeleteData,
  multiSoftDeleteData
};