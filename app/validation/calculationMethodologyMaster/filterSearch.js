//import Joi from 'joi';
const Joi = require('joi'); 
const filterSearch = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        calculation_methodology_name: Joi.string().optional(),
        gwp_value: Joi.string().optional(),
        gwp_value_for_co2: Joi.string().optional(),
        gwp_value_for_ch4: Joi.string().optional(),
        gwp_value_for_n2o: Joi.string().optional(),
        start: Joi.number().optional(),
        limit: Joi.number().optional(),
        page: Joi.number().optional(),
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

module.exports = filterSearch;