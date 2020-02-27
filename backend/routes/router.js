"use strict";
let router = (module.exports = require("express").Router());
const cors = require("cors");
const studentRoute = require(`${__base}/student/router`);
const feeRoute = require(`${__base}/fee/router`);
const userRoute = require(`${__base}/user/router`);

var corsOptions = {
  credentials: true
}
router.use((req, res, next) => {
  console.log("routeorigin++", req.get('origin'))
  console.log("routerehEad+++", req.headers.cookie)
  console.log("req.cookies++++", req.cookies)
  corsOptions['origin'] = req.get('origin')
  next()
}, cors(corsOptions))



router.use("/student", studentRoute);
router.use("/fee", feeRoute);
router.use("/user", userRoute);

