const axios = require('axios');
import * as env from "./allSetup.js";
const FormData = require('form-data');
const fs = require('fs');
const baseUrl = process.env.BASE_URL + '/v1/source_master';
const token = process.env.USER_TOKEN;

describe('Source Master API', () => {
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
      source_name:"Test 22",
      source_description:"Test Description",
      source_link1: ""
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
      source_name:"Test 22",
      source_description:"Test Description",
      source_link1: ""
    };
    const response = await axios.post(baseUrl + '/filter_serarch', bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Get Single Reccord', async () => {
    const response = await axios.get(baseUrl + '/2d6b4225-2444-4f9f-9951-8fab2644d072', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Update Single Reccord', async () => {
    let bodyData = {
      source_name:"Test 222",
      source_description:"Test Description2",
      source_link1: ""
    };
    const response = await axios.put(baseUrl + '/2d6b4225-2444-4f9f-9951-8fab2644d072', bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Delete Single Reccord', async () => {
    const response = await axios.get(baseUrl + '/f5459483-5042-47b9-94f5-4074424ac990', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Delete Multiple Reccord', async () => {
    const idsToDelete = ["ef43e891-56f9-470e-9e76-637e51afdbc1", "a2d6a49a-fe74-424b-88ee-66f19cb1383f"];
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
      id:["2d6b4225-2444-4f9f-9951-8fab2644d072"]
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
    const filePath = './SampleBulkUploadFile/sample_source_master.xlsx'; // Replace with your file path
    form.append('file', fs.createReadStream(filePath));
    const response = await axios.post(baseUrl + '/bulkUpload', form, {
      headers: {
        'Authorization': `Bearer ${token}`,

      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);
  
});