//import Joi from 'joi';
const Joi = require('joi'); 
const bulkUploadData = (req,res,next)=>{ 
    const JoiSchema = Joi.object({
        //file: Joi.required(),
        upload_mode: Joi.number().optional(),
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

module.exports = bulkUploadData;