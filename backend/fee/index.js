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

async function getStudentsByClass(req, res) {
	let {schoolId} = req.session
	let {studentClass} = req.body
	let statement = `select id from students where school_id = ? and
	                 class_section_id in 
	                 (select id from class_section where class = ?)`;
	let values = [schoolId, studentClass]
	let studentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values)
	return studentResp	
}

async function addClassDue(req, res, params) {
	const validatorResp = feeValidator.classDueValidator(params);
	if (validatorResp.error) return validatorResp;
	let {amount, mop} = req.body
	let studentResp = await getStudentsByClass(req, res)
	if(studentResp.status == 'error') return studentResp
	let studentArr = studentResp.data
	let statement = "insert into payments(student_id, amount, remarks) values ?";
	let values = []
	for (let student of studentArr){
		values.push([student.id, amount, mop])                
	}
    let classDueResp = await dbUtils.sqlExecutorAsync(req, res, statement, [values])
    return classDueResp	
}

module.exports = {
	payFee,
	addClassDue
};
