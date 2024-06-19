//import Joi from 'joi';
const Joi = require('joi'); 
const filterSearch = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        rating: Joi.string().optional().allow('', null),
        record_date: Joi.date().optional().allow('', null),
        file: Joi.string().optional().allow('', null),
        assured_by: Joi.string().optional().allow('', null),
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