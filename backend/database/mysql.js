/**
 * Created by rohit nawani on 06/05/18.
 */
'use strict'

const mysql = require('mysql')
//const globalConfig = require(`${__base}/config/mysql.json`);

const zonalConfig = {
  beta: {
    database: 'beta_homeyantra',
    debug: true
  },
  prod: {
    database: 'homeyantra',
    debug: false
  },
  test: {
    host: 'localhost',
    database: 'test_homeyantra',
    debug: true,
    user: 'root',
    password: 'root',
    /*     port: 6000, */
    ssl: false
  },
  local: {
    host: 'localhost',
    database: 'shulkpay_local',
    debug: true,
    user: 'root',
    password: 'Pravin@1996',
    ssl: false
  }
}

let state = {
  pool: null,
  mode: null,
}

function getDbServerConfig() {
  let env = process.env.ENVIRONMENT;
  switch (env) {
    case "prod":
      return Object.assign({}, globalConfig, zonalConfig['beta']);
      break;
    case "test":
      return Object.assign({}, globalConfig, zonalConfig['test']);
      break;
    default:
      return Object.assign({}, globalConfig, zonalConfig['local']);
      break;
  }
}

const connect = (mode, callback) => {
  let config = getDbServerConfig();
  state.pool = mysql.createPool(config);
  callback();
}

const getConnection = () => {
  return state.pool;
}

function sqlExecutor(req, res, statement, values, cb) {
  getConnection().query({
    sql: statement,
    values: values
  }, function (err, results, field) {
    if (err) {
      cb(null, err)
    } else {
      cb(results, null)
    }
  });
}

function sqlExecutorAsync(req, res, statement, values) {
  return new Promise((resolve, reject) => {
    sqlExecutor(req, res, statement, values, (result, error) => {
      if (error) {
        console.log('====ERROR:===')
        console.log(error.msg)
        return resolve({ status: 'error', msg: 'Unexpected error occurred', error })
      }
      return resolve({ status: 'success', data: result })
    })
  })
}


