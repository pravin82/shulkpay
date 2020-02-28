"use strict";

const session = require("express-session");
const uuid = require("uuid/v4");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")({
  session: session
});


AWS.config.region = "us-east-1";

const dynamoDBConfig = {
  table: "shulkpay-session",
  client: new AWS.DynamoDB(),
  AWSRegion: "us-east-1",
  reapInterval: 3600 * 1000
};


const globalSessionConfig = {
  cookie: {
    httpOnly: false,
    domain: ".shulkpay.test",
    secure: false,
    maxAge: 24 * 3600 * 1000, // 1 day
    path: "/"
  },
  genid: function(req) {
    return uuid();
  },
  name: "sessionId",
  proxy: true,
  secret: "pravin",
  resave: false,
  saveUninitialized: true
};

module.exports = function() {
  let envConfig = {
    store: session.MemoryStore()
  };
 


  if (!("ENVIRONMENT" in process.env && process.env.ENVIRONMENT === "local")) {
    envConfig.store = new DynamoDBStore(dynamoDBConfig);
    envConfig.cookie = {
      httpOnly: false,
      domain: ".shulkpay.com",
      secure: true,
      maxAge: 30 * 24 * 3600 * 1000, // 1 month
      path: "/"
    };
  }

  return session(Object.assign({}, globalSessionConfig, envConfig));
};
