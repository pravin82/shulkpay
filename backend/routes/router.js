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
  corsOptions['origin'] = req.get('origin')
  next()
}, cors(corsOptions))



router.use("/student", studentRoute);
router.use("/fee", feeRoute);
router.use("/user", userRoute);

