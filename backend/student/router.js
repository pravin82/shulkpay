const router = require("express").Router();
const lodash = require("lodash");
const studentFactory = require("./index.js");

router.post("/add", async (req, res) => {
	const params = lodash.pick(req.body, ["name", "rollNo", "studentClass", "studentSection"]);
	console.log("add stude router+++", req.session)
	const addResp = await studentFactory.addStudent(req, res, params);
	res.send(addResp);
});

module.exports = router;



