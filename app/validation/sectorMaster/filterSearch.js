//import Joi from 'joi';
const Joi = require('joi'); 
const filterSearch = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        sector_name: Joi.string().optional().allow('', null),
        group_id: Joi.string().optional().allow('', null),
        group_name: Joi.string().optional().allow('', null),
        file_path: Joi.string().optional().allow(null,""),
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