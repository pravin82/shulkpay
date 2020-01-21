const router = require("express").Router();
const lodash = require("lodash");
const userFactory = require("./index.js");

router.post("/login", async (req, res) => {
	const params = lodash.pick(req.body, ["username", "password"]);
	const loginResp = await feeFactory.login(req, res, params);
	res.send(loginResp);
});

module.exports = router;
