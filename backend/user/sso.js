const passport = require('passport')
const dbUtils = require(`${__base}/database/mysql`);
const LocalStrategy = require('passport-local').Strategy



const user_login = new LocalStrategy({
  passReqToCallback: true,
}, async (req, username, password, done) => {
  console.log("here in passport")
  console.log("cookie+++", req.headers.cookie)
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
      info.msg = 'Unexpected error occured Error:  ' + error 
      return done(info)
    }
      else {
      if(result[0]){
        info.login_data = result[0]
        info.status = 'success'
      }
      else {
        info.msg = "Wrong Credentials"
      }
      
    }
    return done(info)
  })
})

module.exports = {
  user_login: passport.use('user_login', user_login)
}