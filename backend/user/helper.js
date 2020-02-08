const cookieUtility = require(`${__base}/utils/cookie`);

async function saveSessionAndCookie(req, res, loginData) {
	req.session.username = loginData.username;
	req.session.schoolId = loginData.school_id;
	req.session.userId = loginData.id;
	req.session.name = loginData.name;
	req.session.save();
	console.log("sesscokk+++", req.session)
	cookieUtility.setCookie(res, "username", req.session.username);
	cookieUtility.setCookie(res, "schoolId", req.session.schoolId);
	cookieUtility.setCookie(res, "id", req.session.userId);
	cookieUtility.setCookie(res, "name", req.session.name);
}

module.exports = {
	saveSessionAndCookie
};
