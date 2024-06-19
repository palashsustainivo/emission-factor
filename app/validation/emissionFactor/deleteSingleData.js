//import Joi from 'joi';
const Joi = require('joi'); 
const deleteSingleData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        id: Joi.number().required(),
    }).options({ abortEarly: true }); 

    const result = JoiSchema.validate(req.params);
    if (result.error) {
        res.json({
            status: process.env.VALIDATION_ERROR,
            message: result.error.details.map((error) => error.message),
        });
    } else {
        next();
    }
};

module.exports = deleteSingleData;