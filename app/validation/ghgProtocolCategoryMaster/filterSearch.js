//import Joi from 'joi';
const Joi = require('joi'); 
const filterSearch = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        ghg_protocol_category_name: Joi.string().optional().allow('', null),
        scope: Joi.string().optional().allow('', null),
        start: Joi.number().optional().allow('', null),
        limit: Joi.number().optional().allow('', null),
        page: Joi.number().optional().allow('', null),
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