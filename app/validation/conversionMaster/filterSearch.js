//import Joi from 'joi';
const Joi = require('joi'); 
const filterSearch = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        operator: Joi.string().optional().allow(null,""),
        uom_id: Joi.string().allow(null,""),
        uom2_id: Joi.string().allow(null,""),
        type: Joi.string().optional().allow(null,""),
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