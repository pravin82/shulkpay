const router = require("express").Router();
const lodash = require("lodash");
const feeFactory = require("./index.js");
const { isAuthenticated } = require(`${__base}/user/helper`);


router.post("/payFee", isAuthenticated,  async (req, res) => {
	const params = lodash.pick(req.body, ["studentId", "amount"]);
	const feePaymentResp = await feeFactory.payFee(req, res, params);
	res.send(feePaymentResp);
});

module.exports = router;
