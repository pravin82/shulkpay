const router = require('express').Router()
const feeFactory = require('./index.js')

router.post('/payFee', async (req, res) => {
  const feePaymentResp = await feeFactory.payFee(req, res)
  res.send(feePaymentResp)
})

module.exports = router;