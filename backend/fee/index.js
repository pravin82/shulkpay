const dbUtils = require(`${__base}/database/mysql`);
const feeValidator = require("./validator");

async function payFee(req, res, params) {
	const validatorResp = feeValidator.payFeeValidator(params);
	if (validatorResp.error) return validatorResp;
	let { studentId, amount, mop } = req.body;
	console.log("req.b++=", req.body)
	let statement = `insert into payments (student_id, amount, remarks) values (?, ?, ?)`;
	let values = [studentId, amount, mop];
	let feePaymentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	return feePaymentResp;
}

module.exports = {
	payFee
};
