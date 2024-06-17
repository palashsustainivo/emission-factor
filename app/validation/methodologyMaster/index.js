const createData = require('./createData');
const listData = require('./listData');
const updateData = require('./updateData');
const deleteSingleData = require('./deleteSingleData');
const deleteMultipleData = require('./deleteMultipleData');
const bulkUploadData = require('./bulkUploadData');
const filterSearch = require('./filterSearch');
const softDeleteMultipleData = require('./softDeleteMultipleData');

module.exports = {
    createData,
    listData,
    updateData,
    deleteSingleData,
    deleteMultipleData,
    bulkUploadData,
    filterSearch,
    softDeleteMultipleData
}