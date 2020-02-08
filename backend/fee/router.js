const router = require("express").Router();
const lodash = require("lodash");
const feeFactory = require("./index.js");

router.post("/payFee", async (req, res) => {
	console.log("feeRoutesess+++", req.session)
	const params = lodash.pick(req.body, ["studentId", "amount"]);
	const feePaymentResp = await feeFactory.payFee(req, res, params);
	res.send(feePaymentResp);
});

module.exports = router;
