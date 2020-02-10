const dbUtils = require(`${__base}/database/mysql`);
const studentValidator = require("./validator");

async function addStudent(req, res, params) {
	const validatorResp = studentValidator.addStudentValidator(params);
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

async function searchStudent(req, res, params) {
	const validatorResp = studentValidator.searchStudentValidator(params);
	if (validatorResp.error) return validatorResp;
	let {schoolId} = req.session
	let { searchPhrase, studentClass } = req.query;
	let statement = `select s.name, s.roll_no, s.id, cs.section, cs.class
	                 from students s
	                 left join class_section cs on s.class_section_id = cs.id
	                 where s.name like '${searchPhrase}%' and s.school_id = ?
	                 and cs.class = ?`;
	let values = [schoolId, studentClass];
	let addStudentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	
	return addStudentResp;
}

async function getStudentDetail(req, res, params) {
	const validatorResp = studentValidator.studentDetailValidator(params);
	if (validatorResp.error) return validatorResp;
	let {schoolId} = req.session
	let {studentId } = req.query;
	let statement = `select s.name, s.roll_no, s.id, cs.section
	                 from students s
	                 left join class_section cs on s.class_section_id = cs.id
	                 where s.name like '${searchPhrase}%' and s.school_id = ?
	                 and cs.class = ?`;
	let values = [schoolId, studentClass];
	let addStudentResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	
	return addStudentResp;
}


module.exports = {
	addStudent,
	searchStudent
};
