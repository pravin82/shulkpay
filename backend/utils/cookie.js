const isLocalExecution =
  "ENVIRONMENT" in process.env && process.env.ENVIRONMENT === "local";

const cookieOptions = {
  domain: isLocalExecution ? ".shulkpay.test" : ".ec2-54-173-218-163.compute-1.amazonaws.com",
  // secure: (isLocalExecution) ? false : true,
  secure: false,
  // cookie expires in 1 hour if local, 1 month otherwise
  maxAge: (isLocalExecution ? 1 : 30 * 24) * 3600 * 1000
};

const cookieDeleteOptions = {
  domain: isLocalExecution ? ".shulkpay.test" : ".ec2-54-173-218-163.compute-1.amazonaws.com",
  //secure: isLocalExecution ? false : true
  secure: false
};

function getCookie(req, name) {
  return req.cookies[name];
}

function setCookie(res, name, value) {
  return res.cookie(name, value, cookieOptions);
}

function deleteCookie(res, name) {
  return res.clearCookie(name, cookieDeleteOptions);
}

module.exports = {
  getCookie: getCookie,
  setCookie: setCookie,
  deleteCookie: deleteCookie
};
