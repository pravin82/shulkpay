const dbUtils = require(`${__base}/database/mysql`);
const feeValidator = require("./validator");

async function payFee(req, res, params) {
	const validatorResp = feeValidator.payFeeValidator(params);
	if (validatorResp.error) return validatorResp;
	let { studentId, amount, mop } = req.body;
	let {schoolId} = req.session
	let schoolStatement = `select id from students where school_id = ? and id = ?`;
	let schoolValues = [schoolId, studentId]
	let schoolResp = await dbUtils.sqlExecutorAsync(req, res, schoolStatement, schoolValues);
	if(schoolResp.status === 'error') return schoolResp
    if(schoolResp.data.length == 0) {
    	schoolResp.status = 'error'
    	schoolResp.msg  = "Student is not registered under your school"
    	return schoolResp
    }
	let statement = `insert into payments (student_id, amount, remarks) values (?, ?, ?)`;
	let values = [studentId, amount, mop];
	let feePaymentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	return feePaymentResp;
}

module.exports = {
	payFee
};
