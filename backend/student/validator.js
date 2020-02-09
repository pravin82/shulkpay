const Joi = require('joi')

function validate(params, schema) {
  const validateResult = Joi.validate(params, schema)
  if (!validateResult.error) return validateResult
  const validateResp = { status: 'error', errors: [], error: true }
  fillRespWithErrors(validateResp, validateResult)
  return validateResp
}
function fillRespWithErrors(resp, errorObj) {
  for (let error of errorObj.error.details) {
    resp.errors.push(error.message)
  }
}

function addStudentValidator(params) {
  
  const schema = Joi.object().keys({
  rollNo:Joi.number().integer().required(),
  name: Joi.string().required(),
  studentSection:Joi.string().required(),
  studentClass:Joi.string().required()
  })
  return validate(params, schema)
}

module.exports={
	addStudentValidator
}