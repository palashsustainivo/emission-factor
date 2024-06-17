//import Joi from 'joi';
const Joi = require('joi'); 
const deleteMultipleData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        id: Joi.array().items(Joi.string()).required(),
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

module.exports = deleteMultipleData;