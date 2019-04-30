const Joi = require('joi');

function validateCaseId(caseId){
  Joi.assert(caseId, Joi.number().min(1).required());
}

module.exports = {
  validateCaseId
};
