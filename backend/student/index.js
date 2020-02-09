const dbUtils = require(`${__base}/database/mysql`);
const studentValidator = require("./validator");

async function addStudent(req, res, params) {
	const validatorResp = studentValidator.addStudentValidator(params);
	console.log("session+++", req.session)
	let {schoolId} = req.session
	if (validatorResp.error) return validatorResp;
	let { name, studentSection, studentClass, rollNo } = req.body;
	let statement = `insert into students (name, class_section_id, roll_no, school_id) values 
	                (?, 
	                (select id from class_section where class = ? and section = ?),
	                 ?, ?)`;
	let values = [name, studentClass, studentSection,  rollNo, schoolId];
	let addStudentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	
	return addStudentResp;
}

module.exports = {
	addStudent
};
