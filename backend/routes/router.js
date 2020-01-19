'use strict'
let router = module.exports = require('express').Router()
const cors = require('cors')
const feeRoute = require(`${__base}/fee/router`)
router.use('/fee',  feeRoute)
