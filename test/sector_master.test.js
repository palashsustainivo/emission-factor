const axios = require('axios');
import * as env from "./allSetup.js";
const FormData = require('form-data');
const fs = require('fs');
const baseUrl = process.env.BASE_URL + '/v1/sector_master';
const token = process.env.USER_TOKEN;

describe('Sector Master API', () => {
  it('List API Data', async () => {
    const response = await axios.get(baseUrl + '?page=1&limit=1', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Create Reccord', async () => {
    let bodyData = {
      sector_name: "Test ABC",
      group_id: "c09bf5f0-8962-4a5e-9676-1dfd25933e15"
    };
    const response = await axios.post(baseUrl , bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Filter Search Reccord', async () => {
    let bodyData = {
      sector_name: "Test ABC",
    };
    const response = await axios.post(baseUrl + '/filter_serarch', bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Get Single Reccord', async () => {
    const response = await axios.get(baseUrl + '/a2d6a49a-fe74-424b-88ee-66f19cb1383f', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Update Single Reccord', async () => {
    let bodyData = {
      sector_name: "Test ABC",
      group_id: "c09bf5f0-8962-4a5e-9676-1dfd25933e15"
    };
    const response = await axios.put(baseUrl + '/a2d6a49a-fe74-424b-88ee-66f19cb1383f', bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Delete Single Reccord', async () => {
    const response = await axios.get(baseUrl + '/a2d6a49a-fe74-424b-88ee-66f19cb1383f', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Delete Multiple Reccord', async () => {
    const idsToDelete = ["986cbac5-3fa3-4f2b-8b8e-f46426cf8523", "a2d6a49a-fe74-424b-88ee-66f19cb1383f"];
    const response = await axios.delete(`${baseUrl}/delete/multi`, {
      data: { id: idsToDelete },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Soft Delete Multiple Reccord', async () => {
    let bodyData = {
      id:["a2d6a49a-fe74-424b-88ee-66f19cb1383f"]
    };
    const response = await axios.post(baseUrl + '/soft/delete', bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Bulk Upload', async () => {
    const form = new FormData();
    const filePath = './SampleBulkUploadFile/sample_sector_master.xlsx'; // Replace with your file path
    form.append('file', fs.createReadStream(filePath));
    const response = await axios.post(baseUrl + '/bulkUpload', form, {
      headers: {
        'Authorization': `Bearer ${token}`,

      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);
  
});