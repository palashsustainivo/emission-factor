
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
    let isRecordExist = await dbCrud.findOneReccord({ef_identifier: bodyData.ef_identifier,is_deleted: process.env.IS_DELETED_NO});
    if(isRecordExist == null) {
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
    } else {
      let sendResponse = {
        data: [],
        message: process.env.RECCORD_EXIST_MASSAGE
      };
      res.status(process.env.VALIDATION_ERROR).send(sendResponse);
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
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
    let skippedRowData = [];
    if(dbStoreData) {
      let uploadMode = req.body.upload_mode;
      if(uploadMode == 1) {
        await dbCrud.truncateTable();
      }
      let excelIndex = 0;
      for(let item of dbStoreData){
        excelIndex++;
        //Check if source name is present in the master
        let sourceDetails = "";
        if(item[3] != null) {
          sourceDetails = sourceModelDbCrud.findOneReccord({source_name: item[3]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let lisenceTypeDetails = "";
        if(item[17] != null) {
          lisenceTypeDetails = licenseTypeModelDbCrud.findOneReccord({license_type_name: item[17]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let lisenceDetails = "";
        if(item[18] != null) {
          lisenceDetails = licenseModelDbCrud.findOneReccord({url: item[18]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let methodologyDetails = "";
        if(item[13] != null) {
          methodologyDetails = methodologyModelDbCrud.findOneReccord({methodology_name: item[13]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let calculationOriginDetails = "";
        if(item[15] != null) {
          calculationOriginDetails = calculationOriginModelDbCrud.findOneReccord({calculation_origin_name: item[15]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let regionDetails = "";
        if(item[28] != null) {
          regionDetails = regionModelDbCrud.findOneReccord({region_name: item[28]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let groupDetails = "";
        if(item[31] != null) {
          groupDetails = groupModelDbCrud.findOneReccord({group_name: item[31]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let sectorDetails = "";
        if(item[30] != null) {
          sectorDetails = sectorModelDbCrud.findOneReccord({sector_name: item[30]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let categoryDetails = "";
        if(item[29] != null) {
          categoryDetails = categoryModelDbCrud.findOneReccord({category_name: item[29]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let verificationTypeDetails = "";
        if(item[19] != null) {
          verificationTypeDetails = verificationTypeModelDbCrud.findOneReccord({verification_type_name: item[19]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let ghgProtocolCategoryDetails = "";
        if(item[12] != null && item[32] != null) {
          ghgProtocolCategoryDetails = ghgProtocolCategoryModelDbCrud.findOneReccord({ghg_protocol_category_name: item[23],scope: item[24]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        let assuranceDetails = "";
        if(item[23] != null && item[24] != null && item[25] != null && item[26] != null) {
          assuranceDetails = assuranceModelDbCrud.findOneReccord({rating: item[23],record: item[24],file: item[25],assured_by: item[26]});
        } else {
          /*let skippedRowDetails = {
            rowNo: excelIndex,
            message: process.env.ALL_MASTER_COLUMN_DATA_NOT_FOUND
          };
          skippedRowData.push(skippedRowDetails);
          skippedRow++;
          continue;*/
        }
        const allData = await Promise.all([sourceDetails, lisenceTypeDetails, lisenceDetails, methodologyDetails, calculationOriginDetails, regionDetails, groupDetails, sectorDetails, categoryDetails, verificationTypeDetails, ghgProtocolCategoryDetails, assuranceDetails]);
        // Create All Master Data
          let source_id = '';
          if(allData[0] != null && typeof allData[0] != "undefined" && allData[0] != "") {
            source_id = allData[0].source_id;
          } else {
            if(item[3] != "" && item[3] != null) {
              let insertData = await sourceModelDbCrud.create({source_name: item[3],source_description:item[4],source_link1:item[5],created_by: createdByUserId});
              source_id = insertData.source_id;
            }
          }
          let license_type_id = '';
          if(allData[1] != null && typeof allData[1] != "undefined" && allData[1] != "") {
            license_type_id = allData[1].license_type_id;
          } else {
            if(item[17] != "" && item[17] != null) {
              let insertData = await licenseTypeModelDbCrud.create({license_type_name: item[17],created_by: createdByUserId});
              license_type_id = insertData.license_type_id;
            }
          }
          let license_id = '';
          if(allData[2] != null && typeof allData[2] != "undefined" && allData[2] != "") {
            license_id = allData[2].license_id;
          } else {
            if(item[18] != "" && item[18] != null && license_type_id != "" && license_type_id != null) {
              let insertData = await licenseModelDbCrud.create({url: item[18],license_type_id: license_type_id,created_by: createdByUserId});
              license_id = insertData.license_id;
            }
          }
          let methodology_id = '';
          if(allData[3] != null && typeof allData[3] != "undefined" && allData[3] != "") {
            methodology_id = allData[3].methodology_id;
          } else {
            if(item[13] != "" && item[13] != null) {
              let insertData = await methodologyModelDbCrud.create({methodology_name: item[13],created_by: createdByUserId});
              methodology_id = insertData.methodology_id;
            }
          }
          let calculation_origin_id = '';
          if(allData[4] != null && typeof allData[4] != "undefined" && allData[4] != "") {
            calculation_origin_id = allData[4].calculation_origin_id;
          } else {
            if(item[15] != "" && item[15] != null) {
              let insertData = await calculationOriginModelDbCrud.create({calculation_origin_name: item[15],created_by: createdByUserId});
              calculation_origin_id = insertData.calculation_origin_id;
            }
          }
          let region_id = '';
          if(allData[5] != null && typeof allData[5] != "undefined" && allData[5] != "") {
            region_id = allData[5].region_id;
          } else {
            if(item[28] != "" && item[28] != null) {
              let insertData = await regionModelDbCrud.create({region_name: item[28],created_by: createdByUserId});
              region_id = insertData.region_id;
            }
          }
          let group_id = '';
          if(allData[6] != null && typeof allData[6] != "undefined" && allData[6] != "") {
            group_id = allData[6].group_id;
          } else {
            if(item[31] != "" && item[31] != null) {
              let insertData = await groupModelDbCrud.create({group_name: item[31],created_by: createdByUserId});
              group_id = insertData.group_id;
            }
          }
          let sector_id = '';
          if(allData[7] != null && typeof allData[7] != "undefined" && allData[7] != "") {
            sector_id = allData[7].sector_id;
          } else {
            if(item[30] != "" && item[30] != null & group_id != "" && group_id != null) {
              let insertData = await sectorModelDbCrud.create({sector_name: item[30],group_id:group_id,created_by: createdByUserId});
              sector_id = insertData.sector_id;
            }
          }
          let category_id = '';
          if(allData[8] != null && typeof allData[8] != "undefined" && allData[8] != "") {
            category_id = allData[8].category_id;
          } else {
            if(item[29] != "" && item[29] != null & sector_id != "" && sector_id != null) {
              let insertData = await categoryModelDbCrud.create({category_name: item[29],sector_id:sector_id,created_by: createdByUserId});
              category_id = insertData.category_id;
            }
          }
          let verification_type_id = '';
          if(allData[9] != null && typeof allData[9] != "undefined" && allData[9] != "") {
            verification_type_id = allData[9].verification_type_id;
          } else {
            if(item[19] != "" && item[19] != null) {
              let insertData = await verificationTypeModelDbCrud.create({verification_type_name: item[19],created_by: createdByUserId});
              verification_type_id = insertData.verification_type_id;
            }
          }
          let ghg_protocol_category_id = '';
          if(allData[10] != null && typeof allData[10] != "undefined" && allData[10] != "") {
            ghg_protocol_category_id = allData[10].ghg_protocol_category_id;
          } else {
            if(item[12] != "" && item[12] != null) {
              let insertData = await ghgProtocolCategoryModelDbCrud.create({ghg_protocol_category_name: item[12],scope: item[32],created_by: createdByUserId});
              ghg_protocol_category_id = insertData.ghg_protocol_category_id;
            }
          }
          let assurance_id = '';
          if(allData[11] != null && typeof allData[11] != "undefined" && allData[11] != "") {
            assurance_id = allData[11].assurance_id;
          } else {
            if(item[23] != "" && item[23] != null && item[26] != "" && item[26] != null) {
              let insertData = await assuranceModelDbCrud.create({rating: item[23],record: item[24],file: item[25],assured_by: item[26],created_by: createdByUserId});
              assurance_id = insertData.assurance_id;
            }
          }
        // Create All Master Data
        let rowData = {
          ef_name: item[0],
          ef_identifier: item[1],
          co2e_total: item[45],
          unit: item[46],
          hsn_code: item[2],
          source_id:source_id,
          license_type_id:license_type_id,
          license_id:license_id,
          methodology_id:methodology_id,
          calculation_origin_id:calculation_origin_id,
          region_id:region_id,
          group_id:group_id,
          sector_id:sector_id,
          category_id:category_id,
          verification_type_id:verification_type_id,
          ghg_protocol_category_id:ghg_protocol_category_id,
          assurance_id:assurance_id,
          co2: item[33],
          co2_unit: item[34],
          ch4: item[35],
          ch4_unit: item[36],
          n2o: item[39],
          n2o_unit: item[40],
          co2_other: item[43],
          co2_other_unit: item[44],
          co2eofch4: item[37],
          co2ofch4_unit: item[38],
          co2eofn2o: item[41],
          co2eofn2o_unit: item[42],
          scope: item[32],
          quality_score: item[21],
          quality_issue: item[22],
          verified_by: item[20],
          casual_activity: item[16],
          version:item[11],
          additional_info1:item[7],
          additional_info2:item[8],
          year:item[9],
          year_released:item[10],
          source_link2:item[6],
          permission_level:item[27],
        };
        //Insert Or Get Data For UOM For Co2
        let unitOfCo2Total = await uomModelDbCrud.findOneReccord({uom_name: item[46]});
        if(unitOfCo2Total != null) {
          rowData.unit = unitOfCo2Total.uom_id;
        } else {
          if(item[46] != "" && item[46] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[46],created_by: createdByUserId});
            rowData.unit = insertData.uom_id;
          }
        }
        //Insert Or Get Data For UOM For Co2
        let unitOfCo2 = await uomModelDbCrud.findOneReccord({uom_name: item[34]});
        if(unitOfCo2 != null) {
          rowData.co2_unit = unitOfCo2.uom_id;
        } else {
          if(item[34] != "" && item[34] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[34],created_by: createdByUserId});
            rowData.co2_unit = insertData.uom_id;
          }
        }
        //Insert Or Get Data For UOM For Ch4
        let unitOfCh4 = await uomModelDbCrud.findOneReccord({uom_name: item[36]});
        if(unitOfCh4 != null) {
          rowData.ch4_unit = unitOfCh4.uom_id;
        } else {
          if(item[36] != "" && item[36] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[36],created_by: createdByUserId});
            rowData.ch4_unit = insertData.uom_id;
          }
        }
        //Insert Or Get Data For UOM For N2O
        let unitOfN2o = await uomModelDbCrud.findOneReccord({uom_name: item[40]});
        if(unitOfN2o != null) {
          rowData.n2o_unit = unitOfN2o.uom_id;
        } else {
          if(item[40] != "" && item[40] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[40],created_by: createdByUserId});
            rowData.n2o_unit = insertData.uom_id;
          }
        }
        //Insert Or Get Data For UOM For co2Other
        let co2OtherUnit = await uomModelDbCrud.findOneReccord({uom_name: item[44]});
        if(co2OtherUnit != null) {
          rowData.co2_other_unit = co2OtherUnit.uom_id;
        } else {
          if(item[44] != "" && item[44] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[44],created_by: createdByUserId});
            rowData.co2_other_unit = insertData.uom_id;
          }
        }
        //Insert Or Get Data For UOM For co2OfCh4
        let co2OfCh4Unit = await uomModelDbCrud.findOneReccord({uom_name: item[38]});
        if(co2OfCh4Unit != null) {
          rowData.co2ofch4_unit = co2OfCh4Unit.uom_id;
        } else {
          if(item[38] != "" && item[38] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[38],created_by: createdByUserId});
            rowData.co2ofch4_unit = insertData.uom_id;
          }
        }
        //Insert Or Get Data For UOM For co2OfN2O
        let co2OfN2oUnit = await uomModelDbCrud.findOneReccord({uom_name: item[42]});
        if(co2OfN2oUnit != null) {
          rowData.co2eofn2o_unit = co2OfN2oUnit.uom_id;
        } else {
          if(item[42] != "" && item[42] != null) {
            let insertData = await uomModelDbCrud.create({uom_name: item[42],created_by: createdByUserId});
            rowData.co2eofn2o_unit = insertData.uom_id;
          }
        }
        if(uploadMode == 3) {
          let isRecordExist = await dbCrud.findOneReccord({ef_identifier: item[1],is_deleted: process.env.IS_DELETED_NO});
          if(isRecordExist != null) {
            //Update data
            rowData.updated_by = createdByUserId;
            let updateData = await dbCrud.update(primaryKey,isRecordExist.emission_factor_id, rowData);
            rowNo++;
            continue;
          } else {
            rowData.created_by = createdByUserId;
            let insertReccord = await dbCrud.create(rowData);
            rowNo++;
            continue;
          }
        } else if(uploadMode == 2) {
          let isRecordExist = await dbCrud.findOneReccord({ef_identifier: item[1],is_deleted: process.env.IS_DELETED_NO});
          if(isRecordExist == null) {
            //Insert data
            rowData.created_by = createdByUserId;
            let insertReccord = await dbCrud.create(rowData);
            rowNo++;
          } else {
            let skippedRowDetails = {
              rowNo: excelIndex,
              message: process.env.RECCORD_EXIST_MASSAGE
            };
            skippedRowData.push(skippedRowDetails);
            skippedRow++;
          }
        } else if(uploadMode == 1){
          //Insert data
          rowData.created_by = createdByUserId;
          let insertReccord = await dbCrud.create(rowData);
          rowNo++;
        }
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
      skippedRow: skippedRow,
      skippedRowDetails:skippedRowData
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
    let isRecordExist = await dbCrud.findOneReccordNotId(primaryKey,id,bodyData.ef_identifier,process.env.IS_DELETED_NO);
    if(isRecordExist == null) {
      bodyData.updated_by = req.userId;
      const result = await dbCrud.update(primaryKey,id, bodyData);
      let sendResponse = {
        data: result,
        message: process.env.COMMEON_UPDATE_MESSAGE
      };
      res.status(process.env.SUCCESS_STATUS_CODE).send(sendResponse);
      //res.status(process.env.SUCCESS_STATUS_CODE).json({ message: process.env.COMMEON_UPDATE_MESSAGE });
      log.Info(log1,process.env.SUCCESS_RESPONSE_LOG);
    } else {
      let sendResponse = {
        data: [],
        message: process.env.RECCORD_EXIST_MASSAGE
      };
      res.status(process.env.VALIDATION_ERROR).send(sendResponse);
      log.Info(log1,process.env.ERROR_RESPONSE_LOG);
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