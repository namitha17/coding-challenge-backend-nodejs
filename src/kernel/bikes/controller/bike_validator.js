const Joi = require('joi');
const bikeSchema = Joi.object()
      .keys({
        ownername: Joi.string().trim().min(1).max(255).required(),
        bikename: Joi.string().trim().min(1).max(255).required(),
        licenseno: Joi.string().trim().min(5).max(100).required(),
        color: Joi.string().trim().min(1).max(20).required(),
        type: Joi.string().valid([
          'Mountain Bike',
          'Comfort Bike',
          'Road Bike',
          'Commuting Bike',
          'Track Bike',
          'Tandem Bike',
          'Kids Bike'
        ])
      })
      .options({stripUnknown: true, abortEarly: false});

function validateBikeInfo(bikeInfo){
  const { error, value } = Joi.validate(bikeInfo, bikeSchema);
  if(error){
    throw new Error(`Validation errors in bike data: ${error.message}`);
  }
  return value;
}

module.exports = {
  validateBikeInfo
};
