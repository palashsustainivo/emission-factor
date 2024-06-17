const readXlsxFile = require('read-excel-file/node')

/**
 * All Common Operation For Excel File
 * 
 */
const readExcel = async (path,userId="") => {
  try {
    let data = [];
    return  data = readXlsxFile(path).then((rows) => {
      const allColumns = rows[0];
      // skip header
      rows.shift();
      let excelData = [];
      rows.forEach((row) => {
        let eachRow = {};
        let index = 0;
        for(let eachColumn of allColumns) {
          eachRow[eachColumn] = row[index];
          index++;
        }
        eachRow.created_by = userId;
        excelData.push(eachRow);
      });
      return excelData;
    })
    .catch((err) => {
      return false;
    });
  } catch (error) {
    return false;
  }
};

export default readExcel;