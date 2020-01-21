"use strict";
let router = (module.exports = require("express").Router());
const cors = require("cors");
const feeRoute = require(`${__base}/fee/router`);
const userRoute = require(`${__base}/user/router`);
router.use("/fee", feeRoute);
router.use("/user", userRoute);
