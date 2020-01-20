const router = require('express').Router()
const feeFactory = require('./index.js')

router.get('/payFee', async (req, res) => {
  console.log("in fee router function")
  const feePaymentResp = await feeFactory.payFee(req, res)
  res.send(feePaymentResp)
})

module.exports = router;