const cookieUtility = require(`${__base}/utils/cookie`);

async function saveSessionAndCookie(req, res, loginData) {
	req.session.username = loginData.username;
	req.session.schoolId = loginData.school_id;
	req.session.userId = loginData.id;
	req.session.name = loginData.name;
	req.session.save();
	cookieUtility.setCookie(res, "username", req.session.username);
	cookieUtility.setCookie(res, "schoolId", req.session.schoolId);
	cookieUtility.setCookie(res, "userId", req.session.userId);
	cookieUtility.setCookie(res, "name", req.session.name);
}

function deleteUserSession(req, res) {
  cookieUtility.deleteCookie(res, 'userId')
  cookieUtility.deleteCookie(res, 'name')
  cookieUtility.deleteCookie(res, 'schoolId')
  cookieUtility.deleteCookie(res, 'username')
}

function isAuthenticated(req, res, next) {
  if (req.session.userId && parseInt(req.session.userId) > 0) {
    return next()
  } else {
    deleteUserSession(req, res);
    return res.json({ msg: "The user is not loggedIn",
                      status:"error" })
  }
}

async function loginStatus(req, res, params) {
  const userId = params.userId
  let loginResp = {}
  loginStatus.loginStatus = 0
  if (req.session.userId && (userId == req.session.userId)) {
    loginResp.loginStatus = 1
  }
  return loginResp
}

module.exports = {
	saveSessionAndCookie,
	isAuthenticated,
	loginStatus
};
