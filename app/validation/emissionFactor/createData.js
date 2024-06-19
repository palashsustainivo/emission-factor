//import Joi from 'joi';
const Joi = require('joi'); 
const createData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        ef_name: Joi.string().required(),
        ef_identifier: Joi.string().required(),
        co2e_total: Joi.string().optional().allow(null,""),
        unit: Joi.string().optional().allow(null,""),
        hsn_code: Joi.string().optional().allow(null,""),
        source_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        uom_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        license_type_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        license_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        methodology_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        calculation_methodology_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        calculation_origin_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        region_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        group_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        sector_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        category_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        verification_type_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        ghg_protocol_category_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        assurance_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        co2: Joi.string().optional().allow(null,""),
        co2_unit: Joi.string().optional().allow(null,""),
        ch4: Joi.string().optional().allow(null,""),
        ch4_unit: Joi.string().optional().allow(null,""),
        n2o: Joi.string().optional().allow(null,""),
        n2o_unit: Joi.string().optional().allow(null,""),
        co2_other_unit: Joi.string().optional().allow(null,""),
        co2eofch4: Joi.string().optional().allow(null,""),
        co2ofch4_unit: Joi.string().optional().allow(null,""),
        co2eofn2o: Joi.string().optional().allow(null,""),
        co2eofn2o_unit: Joi.string().optional().allow(null,""),
        gwp_value: Joi.string().required(),
        scope: Joi.string().valid('Scope 1', 'Scope 2', 'Scope 3').required(),
        quality_score: Joi.string().optional().allow(null,""),
        quality_issue: Joi.string().optional().allow(null,""),
        verified_by: Joi.string().optional().allow(null,""),
        casual_activity: Joi.string().optional().allow(null,""),
        version: Joi.string().optional().allow(null,""),
        additional_info1: Joi.string().optional().allow(null,""),
        additional_info2: Joi.string().optional().allow(null,""),
        year: Joi.string().optional().allow(null,""),
        year_released: Joi.string().optional().allow(null,""),
        source_link2: Joi.string().optional().allow(null,""),
        permission_level: Joi.string().optional().allow(null,""),
        created_by: Joi.string().optional().allow(null,""),
        updated_by: Joi.string().optional().allow(null,""),
    }).options({ abortEarly: true }); 

    const result = JoiSchema.validate(req.body);
    if (result.error) {
        res.json({
            status: process.env.VALIDATION_ERROR,
            message: result.error.details.map((error) => error.message),
        });
    } else {
        next();
    }
};

module.exports = createData;