const Joi = require('joi')

function validate(params, schema) {
  const validateResult = Joi.validate(params, schema)
  if (!validateResult.error) return validateResult
  const validateResp = { status: 'error', errors: [], error: true, msg:"" }
  fillRespWithErrors(validateResp, validateResult)
  return validateResp
}
function fillRespWithErrors(resp, errorObj) {
  for (let error of errorObj.error.details) {
    resp.errors.push(error.message)
  }
  resp.msg = resp.errors[0]
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

function searchStudentValidator(params) {
  const schema = Joi.object().keys({
  searchPhrase: Joi.string().required(),
  studentClass:Joi.string().required()
  })
  return validate(params, schema)
}

function studentDetailValidator(params) {
  const schema = Joi.object().keys({
  studentId:Joi.string().required()
  })
  return validate(params, schema)
}



module.exports={
	addStudentValidator,
  searchStudentValidator,
  studentDetailValidator
}