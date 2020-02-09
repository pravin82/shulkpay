const dbUtils = require(`${__base}/database/mysql`);
const feeValidator = require("./validator");

async function payFee(req, res, params) {
	console.log("session in payFee+++", req.session)
	const validatorResp = feeValidator.payFeeValidator(params);
	if (validatorResp.error) return validatorResp;
	let { studentId, amount } = req.body;
	let statement = `insert into payments (student_id, amount) values (?, ?)`;
	let values = [studentId, amount];
	let feePaymentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	return feePaymentResp;
}

module.exports = {
	payFee
};
