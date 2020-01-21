const Joi = require("joi");

function validate(params, schema) {
  const validateResult = Joi.validate(params, schema);
  if (!validateResult.error) return validateResult;
  const validateResp = { status: "error", errors: [], error: true };
  fillRespWithErrors(validateResp, validateResult);
  return validateResp;
}
function fillRespWithErrors(resp, errorObj) {
  for (let error of errorObj.error.details) {
    resp.errors.push(error.message);
  }
}

function loginValidator(params) {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return validate(params, schema);
}

module.exports = {
  loginValidator
};
