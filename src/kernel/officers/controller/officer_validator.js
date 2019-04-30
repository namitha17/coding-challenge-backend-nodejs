const Joi = require('joi');
const officerSchema = Joi.object()
      .keys({
        officername: Joi.string().trim().min(1).max(255).required(),
        officerid: Joi.string().trim().min(1).max(100).required()
      })
      .options({stripUnknown: true, abortEarly: false});

function validateOfficerInfo(officerInfo){
  const { error, value } = Joi.validate(officerInfo, officerSchema);
  if(error){
    throw new Error(`Validation errors in officer data: ${error.message}`);
  }
  return value;
}

function validateOfficerId(officerId){
  Joi.assert(officerId, Joi.number().min(1).required());
}

module.exports = {
  validateOfficerInfo,
  validateOfficerId
};
