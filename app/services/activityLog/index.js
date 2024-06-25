
import modelDbCrud from './dbCrud.js';
const { Op } = require('sequelize');
const log = require('node-file-logger');
import sanitizeHtml from 'sanitize-html';
import { search } from './route.js';


/**
 * Get all data by searching parameter activity log records
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
    let from_date = sanitizeHtml(req.body.from_date) ? req.body.from_date : process.env.DEFAULT_FROM_DATE;
    let to_date = sanitizeHtml(req.body.from_date) ? req.body.from_date : process.env.DEFAULT_TO_DATE;
    let created_by = sanitizeHtml(req.body.created_by) ? req.body.created_by : "";
    let start = sanitizeHtml(req.body.start) ? req.body.start : process.env.DEFAULT_STAERT;
    let limit = sanitizeHtml(req.body.limit) ? req.body.limit : process.env.DEFAULT_LIMIT;
    const page = sanitizeHtml(req.body.page) ? req.body.page : process.env.DEFAULT_PAGE;
    if(page != "" && page != undefined && page != null) {
      start = (page - 1) * limit;
    }

    let serachParam = {
      table_name: req.body.table_name,
      ref_id: req.body.ref_id,
    };
    // Sanitize each field in serachParam here...
    for (let key in serachParam) {
      if (serachParam.hasOwnProperty(key)) {
        //serachParam[key] = sanitizeHtml(serachParam[key]);
        serachParam[key] = {
          [Op.like]: "%" + serachParam[key] + "%"
        };
      }
    }
    // serachParam.action_type = {
    //   [Op.notIn]: ['DELETE', 'GET']
    // };
    serachParam.createdAt = {
      [Op.between]: [from_date, to_date]
    };
    if(created_by != "") {
      serachParam.created_by = created_by;
    }
    serachParam = Object.keys(serachParam).filter(objKey =>
      (objKey !== process.env.START_KEY && objKey !== process.env.LIMIT_KEY && objKey !== process.env.PAGE_KEY)).reduce((newObj, key) =>
      {
        newObj[key] = serachParam[key];
        return newObj;
      }, {}
    );
    const result = await modelDbCrud.filterSearch(serachParam,parseInt(start),parseInt(limit));
    //const sanitizedResult = sanitizeHtml(JSON.stringify(result));
    const totalCount = await modelDbCrud.filterSearchCount(serachParam);//get total count while searching data
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



module.exports = {
  filterSearch,
};