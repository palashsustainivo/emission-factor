//import Joi from 'joi';
const Joi = require('joi'); 
const filterSearch = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        table_name: Joi.string().required(),
        from_date: Joi.date().optional().allow(null,""),
        to_date: Joi.date().optional().allow(null,""),
        created_by: Joi.string().optional().allow(null,""),
        ref_id: Joi.string().optional().allow(null,""),
        secondary_ref_id: Joi.string().optional().allow(null,""),
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