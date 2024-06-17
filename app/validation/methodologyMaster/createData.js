//import Joi from 'joi';
const Joi = require('joi'); 
const createData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        methodology_name: Joi.string().required(),
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