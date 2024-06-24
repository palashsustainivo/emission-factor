//import Joi from 'joi';
const Joi = require('joi'); 
const updateData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        operator: Joi.string().required(),
        uom_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        uom2_id: Joi.string().guid({ version: process.env.UUID_VERSION }).required(),
        type: Joi.string().valid('Scope 1', 'Scope 2', 'Scope 3').optional().allow(null,""),
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