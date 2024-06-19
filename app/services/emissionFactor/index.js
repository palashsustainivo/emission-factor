
import dbCrud from '../../models/emissionFactor/index.js';
import modelDbCrud from './dbCrud.js';
import sourceModelDbCrud from '../../models/sourceMaster/index.js'
import uomModelDbCrud from '../../models/uomMaster/index.js'
import licenseTypeModelDbCrud from '../../models/licenseTypeMaster/index.js'
import licenseModelDbCrud from '../../models/licenseMaster/index.js'
import methodologyModelDbCrud from '../../models/methodologyMaster/index.js'
import calculationModelDbCrud from '../../models/calculationMethodologyMaster/index.js'
import calculationOriginModelDbCrud from '../../models/calculationOriginMaster/index.js'
import regionModelDbCrud from '../../models/regionMaster/index.js'
import groupModelDbCrud from '../../models/groupMaster/index.js'
import sectorModelDbCrud from '../../models/sectorMaster/index.js';
import categoryModelDbCrud from '../../models/categoryMaster/index.js'
import verificationTypeModelDbCrud from '../../models/verificationTypeMaster/index.js'
import ghgProtocolCategoryModelDbCrud from '../../models/ghgProtocolCategoryMaster/index.js'
import assuranceModelDbCrud from '../../models/assuranceMaster/index.js'
import readExcelExcludeHeader from '../../common/readExcelExcludeHeader.js';
const { Op } = require('sequelize');
const log = require('node-file-logger');
import sanitizeHtml from 'sanitize-html';
const primaryKey = "emission_factor_id";

/**
 * Get all emission factor records
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
 * Get a single emission factor record by ID
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
 * Get all data by searching parameter state records
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

/**
 * Create a new emission factor record
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
 * Create multiple emission factor records while bulk uploading
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
    let dbStoreData = await readExcelExcludeHeader(path);
    //let insertedRowStatus = [];
    const createdByUserId = req.userId;
    let rowNo = 0;
    let skippedRow = 0;
    if(dbStoreData) {
      let uploadMode = req.body.upload_mode;
      if(uploadMode == 1) {
        await dbCrud.truncateTable();
      }
      for(let item of dbStoreData){
        //Check if source name is present in the master
        let sourceDetails = "";
        if(item[5] != null) {
          sourceDetails = sourceModelDbCrud.findOneReccord({source_name: item[5]});
        } else {
          skippedRow++;
          continue;
        }
        let uomDetails = "";
        if(item[8] != null) {
          uomDetails = uomModelDbCrud.findOneReccord({uom_name: item[8]});
        } else {
          skippedRow++;
          continue;
        }
        let lisenceTypeDetails = "";
        if(item[9] != null) {
          lisenceTypeDetails = licenseTypeModelDbCrud.findOneReccord({license_type_name: item[9]});
        } else {
          skippedRow++;
          continue;
        }
        let lisenceDetails = "";
        if(item[10] != null) {
          lisenceDetails = licenseModelDbCrud.findOneReccord({url: item[10]});
        } else {
          skippedRow++;
          continue;
        }
        let methodologyDetails = "";
        if(item[11] != null) {
          methodologyDetails = methodologyModelDbCrud.findOneReccord({methodology_name: item[11]});
        } else {
          skippedRow++;
          continue;
        }
        let calculationMethodologyDetails = "";
        if(item[12] != null && item[13] != null && item[14] != null && item[15] != null && item[16] != null) {
          calculationMethodologyDetails = calculationModelDbCrud.findOneReccord({calculation_methodology_name: item[12],gwp_value: item[13],gwp_value_for_co2: item[14],gwp_value_for_ch4: item[15],gwp_value_for_n2o: item[16]});
        } else {
          skippedRow++;
          continue;
        }
        let calculationOriginDetails = "";
        if(item[17] != null) {
          calculationOriginDetails = calculationOriginModelDbCrud.findOneReccord({calculation_origin_name: item[17]});
        } else {
          skippedRow++;
          continue;
        }
        let regionDetails = "";
        if(item[18] != null) {
          regionDetails = regionModelDbCrud.findOneReccord({region_name: item[18]});
        } else {
          skippedRow++;
          continue;
        }
        let groupDetails = "";
        if(item[19] != null) {
          groupDetails = groupModelDbCrud.findOneReccord({group_name: item[19]});
        } else {
          skippedRow++;
          continue;
        }
        let sectorDetails = "";
        if(item[20] != null) {
          sectorDetails = sectorModelDbCrud.findOneReccord({sector_name: item[20]});
        } else {
          skippedRow++;
          continue;
        }
        let categoryDetails = "";
        if(item[21] != null) {
          categoryDetails = categoryModelDbCrud.findOneReccord({category_name: item[21]});
        } else {
          skippedRow++;
          continue;
        }
        let verificationTypeDetails = "";
        if(item[22] != null) {
          verificationTypeDetails = verificationTypeModelDbCrud.findOneReccord({verification_type_name: item[22]});
        } else {
          skippedRow++;
          continue;
        }
        let ghgProtocolCategoryDetails = "";
        if(item[23] != null && item[24] != null) {
          ghgProtocolCategoryDetails = ghgProtocolCategoryModelDbCrud.findOneReccord({ghg_protocol_category_name: item[23],scope: item[24]});
        } else {
          skippedRow++;
          continue;
        }
        let assuranceDetails = "";
        if(item[25] != null && item[26] != null && item[27] != null && item[28] != null) {
          assuranceDetails = assuranceModelDbCrud.findOneReccord({rating: item[25],record_date: item[26],file: item[27],assured_by: item[28]});
        } else {
          skippedRow++;
          continue;
        }
        const allData = await Promise.all([sourceDetails, uomDetails, lisenceTypeDetails, lisenceDetails, methodologyDetails, calculationMethodologyDetails, calculationOriginDetails, regionDetails, groupDetails, sectorDetails, categoryDetails, verificationTypeDetails, ghgProtocolCategoryDetails, assuranceDetails]);
        // Create All Master Data
          let source_id = '';
          if(allData[0] != null) {
            source_id = allData[0].source_id;
          } else {
            let insertData = await sourceModelDbCrud.create({source_name: item[5],source_description:item[6],source_link1:item[7],created_by: createdByUserId});
            source_id = insertData.source_id;
          }
          let uom_id = '';
          if(allData[1] != null) {
            uom_id = allData[1].uom_id;
          } else {
            let insertData = await uomModelDbCrud.create({uom_name: item[8],created_by: createdByUserId});
            uom_id = insertData.uom_id;
          }
          let license_type_id = '';
          if(allData[2] != null) {
            license_type_id = allData[2].license_type_id;
          } else {
            let insertData = await licenseTypeModelDbCrud.create({license_type_name: item[9],created_by: createdByUserId});
            license_type_id = insertData.license_type_id;
          }
          let license_id = '';
          if(allData[3] != null) {
            license_id = allData[3].license_id;
          } else {
            let insertData = await licenseModelDbCrud.create({url: item[10],license_type_id: license_type_id,created_by: createdByUserId});
            license_id = insertData.license_id;
          }
          let methodology_id = '';
          if(allData[4] != null) {
            methodology_id = allData[4].methodology_id;
          } else {
            let insertData = await methodologyModelDbCrud.create({methodology_name: item[11],created_by: createdByUserId});
            methodology_id = insertData.methodology_id;
          }
          let calculation_methodology_id = '';
          if(allData[5] != null) {
            calculation_methodology_id = allData[5].calculation_methodology_id;
          } else {
            let insertData = await calculationModelDbCrud.create({calculation_methodology_name: item[12],gwp_value: item[13],gwp_value_for_co2: item[14],gwp_value_for_ch4: item[15],gwp_value_for_n2o: item[16],created_by: createdByUserId});
            calculation_methodology_id = insertData.calculation_methodology_id;
          }
          let calculation_origin_id = '';
          if(allData[6] != null) {
            calculation_origin_id = allData[6].calculation_origin_id;
          } else {
            let insertData = await calculationOriginModelDbCrud.create({calculation_origin_name: item[17],created_by: createdByUserId});
            calculation_origin_id = insertData.calculation_origin_id;
          }
          let region_id = '';
          if(allData[7] != null) {
            region_id = allData[7].region_id;
          } else {
            let insertData = await regionModelDbCrud.create({region_name: item[18],created_by: createdByUserId});
            region_id = insertData.region_id;
          }
          let group_id = '';
          if(allData[8] != null) {
            group_id = allData[8].group_id;
          } else {
            let insertData = await groupModelDbCrud.create({group_name: item[19],created_by: createdByUserId});
            group_id = insertData.group_id;
          }
          let sector_id = '';
          if(allData[9] != null) {
            sector_id = allData[9].sector_id;
          } else {
            let insertData = await sectorModelDbCrud.create({sector_name: item[20],group_id:group_id,created_by: createdByUserId});
            sector_id = insertData.sector_id;
          }
          let category_id = '';
          if(allData[10] != null) {
            category_id = allData[10].category_id;
          } else {
            let insertData = await categoryModelDbCrud.create({category_name: item[21],sector_id:sector_id,created_by: createdByUserId});
            category_id = insertData.category_id;
          }
          let verification_type_id = '';
          if(allData[11] != null) {
            verification_type_id = allData[11].verification_type_id;
          } else {
            let insertData = await verificationTypeModelDbCrud.create({verification_type_name: item[22],created_by: createdByUserId});
            verification_type_id = insertData.verification_type_id;
          }
          let ghg_protocol_category_id = '';
          if(allData[12] != null) {
            ghg_protocol_category_id = allData[12].ghg_protocol_category_id;
          } else {
            let insertData = await ghgProtocolCategoryModelDbCrud.create({ghg_protocol_category_name: item[23],scope: item[24],created_by: createdByUserId});
            ghg_protocol_category_id = insertData.ghg_protocol_category_id;
          }
          let assurance_id = '';
          if(allData[13] != null) {
            assurance_id = allData[13].assurance_id;
          } else {
            let insertData = await assuranceModelDbCrud.create({rating: item[25],record_date: item[26],file: item[27],assured_by: item[28],created_by: createdByUserId});
            assurance_id = insertData.assurance_id;
          }
        // Create All Master Data
        let rowData = {
          ef_name: item[0],
          ef_identifier: item[1],
          co2e_total: item[2],
          unit: item[3],
          source_id:source_id,
          uom_id:uom_id,
          license_type_id:license_type_id,
          license_id:license_id,
          methodology_id:methodology_id,
          calculation_methodology_id:calculation_methodology_id,
          calculation_origin_id:calculation_origin_id,
          region_id:region_id,
          group_id:group_id,
          sector_id:sector_id,
          category_id:category_id,
          verification_type_id:verification_type_id,
          ghg_protocol_category_id:ghg_protocol_category_id,
          assurance_id:assurance_id,
          version:item[46],
          year:item[49],
          year_released:item[50],
        };
        if(uploadMode == 3) {
          let isRecordExist = await dbCrud.findOneReccord(rowData);
          if(isRecordExist.emission_factor_id != null) {
            //Update data
            rowData.hsn_code = item[4];
            rowData.co2 = item[29];
            rowData.co2_unit = item[30];
            rowData.ch4 = item[31];
            rowData.ch4_unit = item[32];
            rowData.n2o = item[33];
            rowData.n2o_unit = item[34];
            rowData.co2_other_unit = item[35];
            rowData.co2eofch4 = item[36];
            rowData.co2ofch4_unit = item[37];
            rowData.co2eofn2o = item[38];
            rowData.co2eofn2o_unit = item[39];
            rowData.gwp_value = item[40];
            rowData.scope = item[41] != null ? item[41] : process.env.DEFAULT_SCOPE;
            rowData.quality_score = item[42];
            rowData.quality_issue = item[43];
            rowData.verified_by = item[44];
            rowData.casual_activity = item[45];
            rowData.additional_info1 = item[47];
            rowData.additional_info2 = item[48];
            rowData.source_link2 = item[51];
            rowData.permission_level = item[52];
            rowData.updated_by = createdByUserId;
            let updateData = await dbCrud.update(primaryKey,isRecordExist.emission_factor_id, rowData);
            rowNo++;
            continue;
          } else {
            skippedRow++;
            continue;
          }
        }
        //Insert data
        rowData.hsn_code = item[4];
        rowData.co2 = item[29];
        rowData.co2_unit = item[30];
        rowData.ch4 = item[31];
        rowData.ch4_unit = item[32];
        rowData.n2o = item[33];
        rowData.n2o_unit = item[34];
        rowData.co2_other_unit = item[35];
        rowData.co2eofch4 = item[36];
        rowData.co2ofch4_unit = item[37];
        rowData.co2eofn2o = item[38];
        rowData.co2eofn2o_unit = item[39];
        rowData.gwp_value = item[40];
        rowData.scope = item[41] != null ? item[41] : process.env.DEFAULT_SCOPE;
        rowData.quality_score = item[42];
        rowData.quality_issue = item[43];
        rowData.verified_by = item[44];
        rowData.casual_activity = item[45];
        rowData.additional_info1 = item[47];
        rowData.additional_info2 = item[48];
        rowData.source_link2 = item[51];
        rowData.permission_level = item[52];
        rowData.created_by = createdByUserId;
        let insertReccord = await dbCrud.create(rowData);
        rowNo++;
      }
    } else {
      let sendResponse = {
        data: [],
        message: process.env.ERROR_READING_EXCEL_FILE_MESSAGE
      };
      res.status(process.env.ERROR_STATUS_CODE).send(sendResponse);
      //res.status(process.env.ERROR_STATUS_CODE).send(process.env.ERROR_READING_EXCEL_FILE_MESSAGE);
      log1.error = process.env.ERROR_READING_EXCEL_FILE_MESSAGE;
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
    }
    let sendResponse = {
      data: [],
      message: process.env.COMMEON_UPLOAD_MESSAGE,
      //insertedRowStatus: insertedRowStatus,
      modifiedRow: rowNo,
      skippedRow: skippedRow
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
 * Update a emission factor record by ID
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
    //res.status(process.env.SUCCESS_STATUS_CODE).json({ message: process.env.COMMEON_UPDATE_MESSAGE });
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
 * Delete a emission factor record by ID
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
 * Delete multiple emission factor record by ID Array
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
 * Soft Delete multiple emission factor record by ID Array
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
  multiSoftDeleteData,
};