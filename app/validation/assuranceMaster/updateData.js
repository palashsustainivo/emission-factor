//import Joi from 'joi';
const Joi = require('joi'); 
const updateData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        rating: Joi.string().required(),
        record: Joi.string().required(),
        file: Joi.string().optional().allow(null,""),
        assured_by: Joi.string().optional().allow(null,""),
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

module.exports = updateData;