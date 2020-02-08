"use strict";
let router = (module.exports = require("express").Router());
const cors = require("cors");
const studentRoute = require(`${__base}/student/router`);
const feeRoute = require(`${__base}/fee/router`);
const userRoute = require(`${__base}/user/router`);



router.use("/student", studentRoute);
router.use("/fee", feeRoute);
router.use("/user", userRoute);

