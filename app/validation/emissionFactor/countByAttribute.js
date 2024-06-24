//import Joi from 'joi';
const Joi = require('joi'); 
const countByAttribute = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        count_by: Joi.string().valid('methodology_id', 'category_id', 'source_id').required(),
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

module.exports = countByAttribute;