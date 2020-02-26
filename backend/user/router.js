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
  console.log("here in router+++")
  passport.authenticate('user_login', function (result) {
    if (result.status === 'success' && result.login_data) {
      userHelper.saveSessionAndCookie(req, res, result.login_data)
    }
    return res.status(200).json(result)
  })(req, res, next)
})





module.exports = router;
