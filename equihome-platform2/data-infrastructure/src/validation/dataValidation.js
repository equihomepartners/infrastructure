const Joi = require('joi');

const propertyDataSchema = Joi.object({
  id: Joi.string().required(),
  suburb: Joi.string().required(),
  postcode: Joi.string().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  price: Joi.number().positive().required(),
  mortgage: Joi.number().min(0).required(),
  clearanceRate: Joi.number().min(0).max(100).required(),
  historicalPrice: Joi.number().positive().required(),
  monthsSinceHistorical: Joi.number().positive().required()
});

async function validatePropertyData(data) {
  try {
    const validatedData = await propertyDataSchema.validateAsync(data);
    return validatedData;
  } catch (error) {
    console.error('Data validation error:', error);
    throw error;
  }
}

async function setupValidation() {
  console.log('Data validation service initialized');
}

module.exports = {
  setupValidation,
  validatePropertyData
}; 