const readXlsxFile = require('read-excel-file/node')

/**
 * All Common Operation For Excel File
 * 
 */
const readExcelExcludeHeader = async (path) => {
  try {
    let data = [];
    return  data = readXlsxFile(path).then((rows) => {
      //const allColumns = rows[0];
      // skip header
      rows.shift();
      let excelData = rows;
      return excelData;
    })
    .catch((err) => {
      return false;
    });
  } catch (error) {
    return false;
  }
};

export default readExcelExcludeHeader;