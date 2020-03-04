const router = require("express").Router();
const lodash = require("lodash");
const passport = require('passport');
const userHelper = require("./helper");
require('./sso');



router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (obj, done) {
  done(null, obj)
});




router.post('/login', function (req, res, next) {
  passport.authenticate('user_login', function (result) {
    if (result.status === 'success' && result.login_data) {
      userHelper.saveSessionAndCookie(req, res, result.login_data)
    }
    return res.status(200).json(result)
  })(req, res, next)
})

router.get("/loginStatus", async (req, res) => {
	const params = lodash.pick(req.query, ["userId"]);
	const loginStatus = await userHelper.loginStatus(req, res, params);
	res.send(loginStatus);
});






module.exports = router;
