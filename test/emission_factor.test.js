const axios = require('axios');
import * as env from "./allSetup.js";
const FormData = require('form-data');
const fs = require('fs');
const baseUrl = process.env.BASE_URL + '/v1/emission_factor';
const token = process.env.USER_TOKEN;

describe('Assurance Master API', () => {
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
      ef_name:"DD",
      ef_identifier:"DDD",
      co2e_total:"DDD",
      unit:"DDSD",
      hsn_code:"DDD",
      source_id:"0fb9def3-db43-4557-816a-b6e3da926e87",
      uom_id:"1f7abb8b-c19a-43ed-819e-1edb961f1d84",
      license_type_id:"52b204fd-51d7-41a5-8603-e22171ad9776",
      license_id:"fe5eac34-f1c5-4951-a197-9df376d5f09c",
      methodology_id:"d5957b54-b382-4ddd-a3a3-1748249b3794",
      calculation_methodology_id:"00f7f433-6600-4d96-ac14-a316422d5d54",
      calculation_origin_id:"926f0bb2-a1bd-4201-9921-ad52982a0bd9",
      region_id:"b41afcea-2d65-48b8-9161-51396381eed4",
      group_id:"2ed54fcd-b824-49dc-964b-53f5f8d9f31f",
      sector_id:"109d81c6-e709-4cc3-ac6e-83dbf360038b",
      category_id:"0cac8388-68f1-4160-932f-ec1f7137e677",
      verification_type_id:"b51da284-4cb6-41f3-aec0-b75f0ccea14c",
      ghg_protocol_category_id:"a7f6e7ff-4901-4fa6-aada-915a19e747e9",
      assurance_id:"6cdbf9a4-a638-4ab3-9ab8-35dc93ebed5c",
      "co2":"",
      "co2_unit":"",
      "ch4":"",
      "ch4_unit":"",
      "n2o":"",
      "n2o_unit":"",
      "co2_other_unit":"",
      "co2eofch4":"",
      "co2ofch4_unit":"",
      "co2eofn2o":"",
      "co2eofn2o_unit":"",
      "gwp_value":"1",
      "scope":"Scope 1",
      "quality_score":"",
      "quality_issue":"",
      "verified_by":"",
      "casual_activity":"",
      "version":"",
      "additional_info1":"",
      "additional_info2":"",
      "year":"",
      "year_released":"",
      "source_link2":"",
      "permission_level":"1"
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
      ef_name:"DD",
      ef_identifier:"DDD",
      co2e_total:"DDD",
      unit:"DDSD",
      hsn_code:"DDD",
      source_id:"2d6b4225-2444-4f9f-9951-8fab2644d072",
      source_name:"GHG",
      license_type_id:"7353d1f2-35cb-4a68-9590-a337c87451f0",
      license_type_name:"",
      license_id:"dbbec63e-6f03-496c-bab1-d756c7429496",
      url:"",
      methodology_id:"f25442ed-0a6b-4cf3-b771-98dfd27db9c2",
      methodology_name:"",
      calculation_origin_id:"10ef769a-5439-412e-8e60-cee7814a7b50",
      calculation_origin_name:"",
      region_id:"01e7ee05-6f46-44d0-9a2a-2e6660c76cd6",
      region_name: "",
      group_id:"c09bf5f0-8962-4a5e-9676-1dfd25933e15",
      group_name: "",
      sector_id:"bdef551c-6482-4eda-aa76-9cf37b5d595c",
      sector_name: "",
      category_id:"49582c33-232b-4f73-abe6-2e0b3c7926a9",
      category_name: "",
      verification_type_id:"c90b6d9a-617f-4b5c-a897-d620eac0a3af",
      verification_type_name: "",
      ghg_protocol_category_id:"0106fc45-fb39-4d08-8dab-d038a2295714",
      ghg_protocol_category_name:"",
      assurance_id:"04dae161-9eee-42f9-a504-c527020ee761",
      rating: "",
      assured_by: "",
      co2:"",
      co2_unit:"",
      ch4:"",
      ch4_unit:"",
      n2o:"",
      n2o_unit:"",
      co2_other_unit:"",
      co2eofch4:"",
      co2ofch4_unit:"",
      co2eofn2o:"",
      co2eofn2o_unit:"",
      gwp_value:"1",
      scope:"Scope 1",
      quality_score:"",
      quality_issue:"",
      verified_by:"",
      casual_activity:"",
      version:"",
      additional_info1:"",
      additional_info2:"",
      year:"",
      year_released:"",
      source_link2:"",
      permission_level:"1"
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
      ef_name:"DD",
      ef_identifier:"DDD",
      co2e_total:"DDD",
      unit:"DDSD",
      hsn_code:"DDD",
      source_id:"0fb9def3-db43-4557-816a-b6e3da926e87",
      uom_id:"1f7abb8b-c19a-43ed-819e-1edb961f1d84",
      license_type_id:"52b204fd-51d7-41a5-8603-e22171ad9776",
      license_id:"fe5eac34-f1c5-4951-a197-9df376d5f09c",
      methodology_id:"d5957b54-b382-4ddd-a3a3-1748249b3794",
      calculation_methodology_id:"00f7f433-6600-4d96-ac14-a316422d5d54",
      calculation_origin_id:"926f0bb2-a1bd-4201-9921-ad52982a0bd9",
      region_id:"b41afcea-2d65-48b8-9161-51396381eed4",
      group_id:"2ed54fcd-b824-49dc-964b-53f5f8d9f31f",
      sector_id:"109d81c6-e709-4cc3-ac6e-83dbf360038b",
      category_id:"0cac8388-68f1-4160-932f-ec1f7137e677",
      verification_type_id:"b51da284-4cb6-41f3-aec0-b75f0ccea14c",
      ghg_protocol_category_id:"a7f6e7ff-4901-4fa6-aada-915a19e747e9",
      assurance_id:"6cdbf9a4-a638-4ab3-9ab8-35dc93ebed5c",
      co2:"",
      co2_unit:"",
      ch4:"",
      ch4_unit:"",
      n2o:"",
      n2o_unit:"",
      co2_other_unit:"",
      co2eofch4:"",
      co2ofch4_unit:"",
      co2eofn2o:"",
      co2eofn2o_unit:"",
      gwp_value:"1",
      scope:"Scope 1",
      quality_score:"",
      quality_issue:"",
      verified_by:"",
      casual_activity:"",
      version:"",
      additional_info1:"",
      additional_info2:"",
      year:"",
      year_released:"",
      source_link2:"",
      permission_level:"1"
    };
    const response = await axios.put(baseUrl + '/46918854-cf1e-450e-a06d-cf8fe28b06b9', bodyData, {
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
    const idsToDelete = ["10a42c10-9c81-4bf8-8436-47d7f255b6d7", "1708440c-c4d1-4136-981a-20f3283aa53e"];
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
    const filePath = './SampleBulkUploadFile/sample_emission_factor_master.xlsx'; // Replace with your file path
    form.append('file', fs.createReadStream(filePath));
    const response = await axios.post(baseUrl + '/bulkUpload', form, {
      headers: {
        'Authorization': `Bearer ${token}`,

      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);

  it('Total Count As Per Attribute', async () => {
    let bodyData = {
      count_by:"source_id",
      limit:1,
      page:1
    };
    const response = await axios.post(baseUrl + '/count/various_attribute', bodyData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    expect(response.status).toBe(parseInt(process.env.SUCCESS_STATUS_CODE));
  },process.env.TEST_EXECUTION_TIME);
  
});