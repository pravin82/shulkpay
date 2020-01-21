const dbUtils = require(`${__base}/database/mysql`);
const userValidator = require("./validator");

async function login(req, res, params) {
	const validatorResp = userValidator.loginValidator(params);
	if (validatorResp.error) return validatorResp;
	let { studentId, amount } = req.body;
	let statement = `select username from users where username = ? and password = ?`;
	let values = [username, password];
	let loginResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	if (loginResp.status == "error") return loginResp;
	else if (loginResp.data.length == 0) {
		loginResp.status = "error";
		loginResp.msg = "Invalid Credentials";
	} else {
		loginResp.status = "success";
		loginResp.msg = "You are loggedIn";
	}
	return loginResp;
}

module.exports = {
	login
};
