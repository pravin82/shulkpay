const passport = require('passport')
const dbUtils = require(`${__base}/database/mysql`);
const LocalStrategy = require('passport-local').Strategy



const user_login = new LocalStrategy({
  passReqToCallback: true,
}, async (req, username, password, done) => {
  const {  } = req.body
  let statement = `select u.username, u.name, u.school_id, u.id,
                   s.name as school_name
                   from users u
                   left join schools s on s.id = u.school_id 
                   where username = ? and password = ?`
  
  let values = [username, password]
  dbUtils.sqlExecutor(null, null, statement, values, async (result, error) => {
    let info = { status: 'error', msg: 'login Successfull' }
    if (error) {
      info.msg = 'Unexpected error occured'
      return done(info)
    }
      else {
      info.login_data = result[0]
      info.status = 'success'
    }
    return done(info)
  })
})

module.exports = {
  user_login: passport.use('user_login', user_login)
}