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
	let statement = `select q2.student_id, q2.amount, q2.created_on, 
	                 q2.updated_on, q2.remarks,
                     q1.total_due
					 from
					 (
					 select student_id, SUM(amount) as total_due
                     from payments
					 where student_id = ? group by student_id 
					 ) q1,
					 (
					 select student_id, amount, remarks, created_on, updated_on
					 from payments where student_id = ?
					 ) q2
					 where q1.student_id = q2.student_id
					 order by q2.created_on desc`;
	                 
	let values = [studentId, studentId];
	let detailResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	return detailResp;
}


module.exports = {
	addStudent,
	searchStudent,
	getStudentDetail
};
