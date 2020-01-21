const dbUtils = require(`${__base}/database/mysql`);
const userValidator = require("./validator");
const userHelper = require("./helper");

async function login(req, res, params) {
	const validatorResp = userValidator.loginValidator(params);
	if (validatorResp.error) return validatorResp;
	let { username, password } = req.body;
	let statement = `select username, name, school_id, id from users where username = ? and password = ?`;
	let values = [username, password];
	let loginResp = await dbUtils.sqlExecutorAsync(req, res, statement, values);
	if (loginResp.status == "error") return loginResp;
	else if (loginResp.data.length == 0) {
		loginResp.status = "error";
		loginResp.msg = "Invalid Credentials";
	} else {
		loginResp.status = "success";
		loginResp.msg = "You are loggedIn";
		userHelper.saveSessionAndCookie(req, res, loginResp.data[0]);
	}
	return loginResp;
}

module.exports = {
	login
};
