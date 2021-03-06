
'use strict'

const mysql = require('mysql')
//const globalConfig = require(`${__base}/config/mysql.json`);

const zonalConfig = {
  beta: {
    host: 'shulkpay-beta.cvtq5bzuezr1.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'shulkpay_beta',
    user: 'admin',
    password: 'ultimatewinner',
    debug: true
  },
  prod: {
    host: 'shulkpay-beta.cvtq5bzuezr1.us-east-1.rds.amazonaws.com',
    port:3306,
    database: 'shulkpay_beta',
    user: 'admin',
    'password': 'ultimatewinner',
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
      return Object.assign({}, zonalConfig['beta']);
      break;
    case "test":
      return Object.assign({}, zonalConfig['test']);
      break;
    default:
      return Object.assign({}, zonalConfig['local']);
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

module.exports = {
  connect: connect,
  getConnection: getConnection,
  sqlExecutorAsync,
  sqlExecutor
}


